# LawBot 프로젝트: 이민자를 위한 한국 법률 번역 챗봇

<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/f8a6e725-e7c0-4672-81e4-5b2d237cf030" alt="Image 1" height="49%"/>
  <img src="https://github.com/user-attachments/assets/7a3ef01c-3caa-4f47-ad61-587b65564295" alt="Image 2" height="49%"/>
</div>


LawBot은 한국에 거주하는 다양한 이민자들이 법적 정보를 보다 쉽게 접근하고 활용할 수 있도록 돕는 법률 번역 챗봇입니다. 
이 프로젝트는 Azure OpenAI, Azure Search, FastAPI 등을 활용하여 다국어 지원, 법률 데이터 검색 및 요약, 음성 인식/출력을 포함한 직관적인 사용자 경험을 제공합니다.   
( 이 프로젝트는 MS AI SCHOOL 5기 2차 프로젝트를 진행하며 개발되었습니다. )

---

# 1. 프로젝트 개요
## 1.1.사업 배경
- 체류 외국인이 300만 명에 달하는 현대 사회에서 이민자들은 법률 체계에 접근하기 어려운 상황에 놓여 있습니다.
- 이민자들의 언어 장벽과 법률 지식 부족으로 인해 법적 문제에 쉽게 노출될 위험이 있습니다.
   
## 1.2.주요 목표
- 법률 정보 접근성 향상: 다국어 번역 및 직관적인 UI를 통해 이민자들이 법률 정보를 쉽게 이해하도록 지원.
- 생활 밀착형 솔루션 제공: 사용자 질문에 맞는 1:1 맞춤형 법률 답변.
- 법률적 사각지대 해소: 법률 지식 제공을 통해 경제적 취약 계층 및 다문화 가정 지원.

---

# 2. 주요 구현 단계
**1. 데이터 준비:**
  - 공공 데이터 포털 등에서 법률 데이터 수집.
  - Azure Translator API를 활용한 다국어 데이터 확장.
   
**2. 모델 학습:**
  - Fine-tuning GPT-4o 및 RAG를 통해 모델 학습.
   
**3. 백엔드 개발:**
  - FastAPI로 RESTful API 구성.
  - Azure Search와 OpenAI API 연동.
   
**4. 프론트엔드 개발:**
  - HTML/CSS/JavaScript로 직관적인 UI 구현.
  - API와 연동하여 실시간 대화 지원.
   
**5. 배포:**
  - Docker Compose를 활용한 멀티 컨테이너 배포.
  - Nginx를 통해 HTTPS 적용 및 포트 포워딩.

---

# 3. 프로젝트 구조
```plaintext
IMMIGRATION_SUPPORT/
├── backend/
│   ├── src/
│   │   └── get_response.py # FastAPI 백엔드 (챗봇 로직)
│   ├── docker-compose.yml  # 앱(법률 챗봇) + Nginx 컨테이너 구성
│   ├── Dockerfile          # FastAPI용 Docker 빌드 설정
│   └── requirements.txt    # Python 라이브러리 목록
├── frontend/
│   └── kiki/
│       ├── src/           # (프론트엔드 이미지폴더)
│       ├── index.html     # 법률 조항 검색 화면
│       ├── package.json
│       ├── script.js      # 법률 조항 검색 js
│       ├── style.css
│       ├── word_script.js # 법률 용어 검색 js
│       ├── word_style.css
│       └── word.html      # 법률 용어 검색 화면
├── preprocess/
│   └── documentinteli.ipynb # PDF 전처리 코드 노트북
├── LICENSE
└── README.md
```

---

# 4. 데이터 수집 및 전처리
## 2.1. 데이터 수집
- 출처:
  - 공공 데이터 포털, 법무부, 한국법제원.
- 수집 대상:
  - 출입국관리법, 국적법, 난민법 등 다양한 법률 데이터.
  - 키워드 기반 문서 검색(법률 용어) 데이터.
  - Q&A 형식 데이터 (FAQ 데이터셋 또는 법률 자문).
## 2.2. 데이터 구조
- 법률 데이터를 장(chapter), 절(section), 조(article)로 세분화하여 저장.
```plaintext
{
  "chapter_id": "1-1",
  "chapter_title": "총칙",
  "title": "목적",
  "content": "이 법은 대한민국에 입국하거나 출국하는 모든 국민 및 외국인의 출입국관리를 통한..."
}
```
## 2.3. 데이터 전처리
- 텍스트 추출 및 클리닝: Azure Document Intelligence를 사용하여 PDF 파일에서 텍스트 추출후 json 파일로 전처리
- 데이터 연결:
  - ID 체계를 통해 장, 절, 조 연결.
  - 법률 제목 및 내용을 content 필드에 통합 저장.
- 다국어 데이터 확장:
  - Azure Translator API를 사용하여 데이터를 10개 언어로 번역.
  - 다국어 데이터셋을 통해 모델 학습.

---

# 5. 기술 스택 및 구현
## 3.1. 주요 기술
- Azure OpenAI: GPT-4o 모델의 Fine-tuning을 통해 한국 법률 데이터를 학습.
- Azure AI Search (RAG): 법률 데이터 검색 및 의미체계 구성을 통한 검색 최적화.
- FastAPI: RESTful API 백엔드 개발.
- Nginx: 리버스 프록시 및 HTTPS 설정.
- JavaScript: 프론트엔드 UI 및 동적 기능 구현.
## 3.2. 데이터 처리 및 모델 학습
**1. Fine-tuning:**
- Q&A 데이터셋(742개 x 10개 언어)을 사용해 GPT-4o 모델 Fine-tuning.
- 학습 파라미터:
  - Batch size: 10
  - Epochs: 3
  - Max Tokens : 200
  - Top-p : 0.8
  - Temperature: 0.3 (정확하고 일관된 답변, RAG까지 적용시 달라짐)
- 성능 지표:
  - ROUGE-1: 0.615
  - Semantic Similarity: 0.887
     
**2. RAG(Retriever-Augmented Generation):**
- Fine-tuned 모델이 검색 실패 시 추가적인 법률 데이터를 RAG로 보완.
- 최신 데이터 업데이트 및 유연한 응답 가능.
- 최종 학습 파라미터:
  - Max Tokens : 4000
  - Top-p : 0.8
  - Temperature: 0.8 (FineTuning 최적화시 도출된 parameter를 RAG & FineTuning 모델에 동일하게 적용시 최종 답변 품질 저하)
   
**3. 다국어 번역:**
- 사용자의 질문을 한국어로 번역 후 검색 수행.
- 검색 결과를 다시 사용자 언어로 번역하여 제공.

---

# 6.시스템 구성
## 4.1. 백엔드(테스트 수준의 서버 구현)
- 구조:
  - FastAPI 서버 → Nginx 리버스 프록시 → Docker 컨테이너 기반.
- 주요 기능:
  - REST API 엔드포인트:
    - /ask/immigration: 출입국 관련 질문.
    - /ask/keyword: 키워드 기반 법률 검색.
    - /ask/lang: 언어 감지.
  - 데이터 보안:
    - .env 파일을 통한 민감 정보 관리(API 키, DB 연결 정보 등).
    - HTTPS 적용(Let’s Encrypt SSL 인증서).
## 4.2. 프론트엔드
- 기능:
  - 챗봇 인터페이스:
    - 질문 입력창 및 전송 버튼.
    - 빠른 응답 버튼 (예: 이민 준비, 노동법 등).
  - 다국어 지원:
    - 10개 언어로 질문 및 응답 가능.
  - STT/TTS 기능:
    - 사용자의 음성 입력(Speech-to-Text) 및 봇 응답 음성 출력(Text-to-Speech).
  - 대화 저장 기능:
    - 선택된 대화를 별도로 저장하고, 이후 재확인 가능.
