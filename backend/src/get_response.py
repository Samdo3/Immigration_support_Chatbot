import requests
import re
from lingua import LanguageDetectorBuilder, Language
from deep_translator import GoogleTranslator
from fastapi import FastAPI
from typing import Optional
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import os


# Azure OpenAI 및 Azure Search 설정
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY")
DEPLOYMENT_NAME = 'gpt-4o-fine-tune-2024-12-21'
SEARCH_ENDPOINT = os.getenv("SEARCH_ENDPOINT")
SEARCH_API_KEY = os.getenv("SEARCH_API_KEY")
SEARCH_INDEX_NAME = "immigrationlaw-index"
SEMANTIC_CONFIGURATION = "immigrationlaw-semantic"

# 언어 감지기 초기화
detector = LanguageDetectorBuilder.from_all_languages().build()

# FastAPI 호출출
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ephemeral-salmiakki-189581.netlify.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def detect_language(text):
    """텍스트의 언어를 감지"""
    detected_language = detector.detect_language_of(text)
    if detected_language is not None:
        return detected_language.name.lower()  # 언어 이름을 소문자로 반환
    else:
        return "unknown"

def translate_to_korean(text):
    """사용자 입력을 한국어로 번역"""
    try:
        return GoogleTranslator(source='auto', target='ko').translate(text)
    except Exception as e:
        print(f"Error in translation: {e}")
        return text  # 번역 실패 시 원본 텍스트 반환

def clean_response(text):
    """불필요한 기호 및 문구를 정리하는 함수"""
    cleaned_text = re.sub(r'\[doc\d+\]', '', text)
    cleaned_text = re.sub(r'[\[\]]', '', cleaned_text)
    return cleaned_text.strip()

def validate_citations(citations):
    """
    Citations 내용이 비어있거나 너무 짧은 경우 False 반환.
    """
    print(f"\nValidating citations... Total citations: {len(citations)}")
    if not citations:
        print("\nNo citations found.")
        return False
    for i, citation in enumerate(citations):
        content = citation.get('content', '')
        print(f"\nCitation {i + 1}: {content[:50]}...")  # 첫 50자만 출력
        if len(content.strip()) < 1:  # 너무 짧은 내용은 무효 처리
            print("Invalid citation detected (too short).")
            return False
    return True

def summarize_with_gpt(citations, user_input, target_language):
    """Citation 데이터를 요약하여 질문에 답변 생성"""
    print("\nSummarizing citations using GPT...")
    combined_text = " ".join([citation.get('content', '').strip() for citation in citations])

    summarization_prompt = f"""
    Question: {user_input}
    Summarize the following information in {target_language} to answer the question:
    {combined_text}
    """

    payload = {"messages": [{"role": "user", "content": summarization_prompt}], "temperature": 0.7, "max_tokens": 1000}
    headers = {"Content-Type": "application/json", "api-key": AZURE_OPENAI_API_KEY}

    response = requests.post(
        f"{AZURE_OPENAI_ENDPOINT}openai/deployments/{DEPLOYMENT_NAME}/chat/completions?api-version=2024-02-15-preview",
        headers=headers, json=payload
    )

    if response.status_code == 200:
        return clean_response(response.json()['choices'][0]['message']['content'].strip())
    else:
        print(f"Error during summarization: {response.status_code}")
        return "An error occurred while summarizing the citations."

def fallback_to_gpt(question, language):
    """Search 실패 시 GPT 자체 지식으로 답변 생성"""
    print("Executing fallback: Generating response using GPT knowledge.")
    fallback_prompt = f"""
    Question: {question}
    Answer (in {language}): If the question is related to Korean law, provide a detailed and accurate response based on general legal knowledge specific to Korean law.

    At the end of your legal response, include this message translated into {language}:
    'Please refer to trusted legal sources to verify the most up-to-date information.'

    If the question is not related to law (e.g., greetings, insults, unrelated content), respond with:
    'I can only answer questions related to Korean law. Please ask questions about Korean legal matters.' in {language}
    """
    payload = {"messages": [{"role": "user", "content": fallback_prompt}], "temperature": 0.7, "max_tokens": 1000}

    headers = {"Content-Type": "application/json", "api-key": AZURE_OPENAI_API_KEY}
    response = requests.post(
        f"{AZURE_OPENAI_ENDPOINT}openai/deployments/{DEPLOYMENT_NAME}/chat/completions?api-version=2024-02-15-preview",
        headers=headers,
        json=payload
    )
    if response.status_code == 200:
        return clean_response(response.json()['choices'][0]['message']['content'].strip())
    else:
        return "An error occurred while generating the fallback response."

def ask_legal_question(user_input, index_name, semantic_name):
    """질문에 대한 응답 반환"""
    print(f"\nProcessing question: {user_input}")
    print(index_name," & ", semantic_name)
    # 언어 감지 및 번역
    detected_language = detect_language(user_input)
    print(f"\nDetected language: {detected_language}")
    translated_question = translate_to_korean(user_input)
    print(f"\nTranslated question for search: {translated_question}")

    headers = {"Content-Type": "application/json", "api-key": AZURE_OPENAI_API_KEY}
    prompt = f"Question: {translated_question}\nAnswer: Provide an answer using retrieved documents."

    payload = {
        "messages": [
            {"role": "system", "content": "You are a multilingual assistant specializing in Korean law. Generate responses that precisely match the structure, terminology, and details of the provided reference answers while maintaining factual accuracy."},
            {"role": "user", "content": prompt}
        ],
        "data_sources": [
            {"type": "azure_search",
             "parameters": {
                 "endpoint": SEARCH_ENDPOINT,
                 "index_name": index_name,
                 "semantic_configuration": semantic_name,
                 "query_type": "semantic",
                 "top_n_documents": 20,
                 "authentication": {"type": "api_key", "key": SEARCH_API_KEY}
             }}
        ],
        "temperature": 0.2, "max_tokens": 1000, "top_p": 0.8, "frequency_penalty": 0.1, "presence_penalty": 0.1
    }

    try:
        print("\nSending request to Azure OpenAI...")
        response = requests.post(
            f"{AZURE_OPENAI_ENDPOINT}openai/deployments/{DEPLOYMENT_NAME}/chat/completions?api-version=2024-02-15-preview",
            headers=headers, json=payload
        )
        print("response.status_code: ", response.status_code)
        if response.status_code != 200:
            raise Exception(f"Azure Search request failed with status code {response.status_code}")

        result = response.json()
        raw_content = result['choices'][0]['message']['content'].strip()
        print(f"raw_content: {raw_content}")
        citations = result['choices'][0]['message'].get('context', {}).get('citations', [])

        # Citations 내용 검사
        if validate_citations(citations):
            print("Valid citations found.")
            if "The requested information is not available" in raw_content or not raw_content:
                print("Raw content is insufficient. Using citations for the response.")
                return summarize_with_gpt(citations, user_input, detected_language)
            return summarize_with_gpt(citations, user_input, detected_language)
        else:
            print("No valid citations found. Triggering fallback...")
            return fallback_to_gpt(user_input, detected_language)

    except Exception as e:
        print(f"Error encountered: {e}")
        return fallback_to_gpt(user_input, detected_language)


# FAST API   
@app.get("/ask/immigration")
def ask_endpoint(question: str):
    answer=ask_legal_question(question, "immigrationlaw-index", "immigrationlaw-semantic")
    return {"answer": answer}

@app.get("/ask/keyword")
def ask_endpoint(question: str):
    answer=ask_legal_question(question, "keyword-index", "keyword-semantic")
    return {"answer": answer}

