document.getElementById("btnword").addEventListener("click", () => {
  // Word.html 파일 열기
  window.location.href = "word.html";
});

document.getElementById("btnmain").addEventListener("click", () => {
  // index.html 파일 열기
  window.location.href = "index.html";
});

//----------------------언어 변경 -------------------------//

// 언어별 번역 데이터
const translations = {
  ko: {
    welcomeMessage: "안녕하세요! 무엇을 도와드릴까요?",
    btnguide: "사용 방법 💡",
    btnprep: "이민준비 ✔️",
    btnLease: "임대차 계약 🏠",
    btnInsurance: "4대 보험 ⚖️",
    btnLaborLaw: "노동법 💼",
    btnsend: "전송",
    btnanswer: "질문을 입력해주세요 !",
  },
  en: {
    welcomeMessage: "Hello! How can I assist you?",
    btnguide: "How to use💡",
    btnprep: "PREP for immigrate✔️",
    btnLease: "Lease Agreement 🏠",
    btnInsurance: "4 Major Insurances ⚖️",
    btnLaborLaw: "Labor Law 💼",
    btnsend: "Send",
    btnanswer: "Please enter your answer!",
  },
  hi: {
    welcomeMessage: "नमस्ते! मैं आपकी किस प्रकार मदद कर सकता हूँ?",
    btnguide: " उपयोग विधि 💡",
    btnprep: "प्रवासन तैयारी ✔️",
    btnLease: "पट्टा समझौता 🏠",
    btnInsurance: "4 प्रमुख बीमा ⚖️",
    btnLaborLaw: "श्रम कानून 💼",
    btnsend: "भेजना",
    btnanswer: "कृपया अपना प्रश्न दर्ज करें!",
  },
  vi: {
    welcomeMessage: "Xin chào! Tôi có thể giúp gì cho bạn?",
    btnguide: "Cách sử dụng 💡",
    btnprep: "Chuẩn bị nhập cư ✔️",
    btnLease: "Hợp đồng thuê nhà 🏠",
    btnInsurance: "4 Bảo hiểm chính ⚖️",
    btnLaborLaw: "Luật lao động 💼",
    btnsend: "gửi",
    btnanswer: "Vui lòng nhập câu hỏi của bạn!",
  },
  ru: {
    welcomeMessage: "Здравствуйте! Как я могу помочь вам?",
    btnguide: "Способ использования 💡",
    btnprep: "Подготовка к иммиграции ✔️",
    btnLease: "Договор аренды 🏠",
    btnInsurance: "4 основных страхования ⚖️",
    btnLaborLaw: "Трудовое законодательство 💼",
    btnsend: "отправлять",
    btnanswer: "Пожалуйста, введите свой ответ!",
  },
  zh: {
    welcomeMessage: "你好！我能为你做些什么？",
    btnguide: "使用方法 💡",
    btnprep: "移民准备 ✔️",
    btnLease: "租赁协议 🏠",
    btnInsurance: "四大保险 ⚖️",
    btnLaborLaw: "劳动法 💼",
    btnsend: "发送",
    btnanswer: "请输入您的答案!",
  },
  th: {
    welcomeMessage: "สวัสดี! ฉันช่วยอะไรคุณได้บ้าง?",
    btnguide: "วิธีการใช้งาน💡",
    btnprep: "เตรียมตัวสำหรับการย้าย✔️",
    btnLease: "สัญญาเช่า 🏠",
    btnInsurance: "ประกันหลัก 4 อย่าง ⚖️",
    btnLaborLaw: "กฎหมายแรงงาน 💼",
    btnsend: "ส่ง",
    btnanswer: "กรุณาป้อนคำตอบของคุณ!",
  },
  uz: {
    welcomeMessage: "Salom! Qanday yordam bera olaman?",
    btnguide: "Qanday foydalanish💡",
    btnprep: "Immigratsiya uchun tayyorgarlik✔️",
    btnLease: "Ijara shartnomasi 🏠",
    btnInsurance: "4 Asosiy sug'urta ⚖️",
    btnLaborLaw: "Mehnat qonuni 💼",
    btnsend: "Yuborish",
    btnanswer: "Iltimos, javobingizni kiriting!",
  },
  tl: {
    welcomeMessage: "Kamusta! Paano kita matutulungan?",
    btnguide: "Paano gamitin💡",
    btnprep: "Maghanda para sa paglipat✔️",
    btnLease: "Kasunduan sa Pag-upa 🏠",
    btnInsurance: "4 Pangunahing Insurance ⚖️",
    btnLaborLaw: "Batas sa Paggawa 💼",
    btnsend: "Ipadala",
    btnanswer: "Pakilagay ang iyong sagot!",
  },
  ja: {
    welcomeMessage: "こんにちは！どのようにお手伝いできますか？",
    btnguide: "使い方💡",
    btnprep: "移住準備✔️",
    btnLease: "賃貸契約 🏠",
    btnInsurance: "主要な4つの保険 ⚖️",
    btnLaborLaw: "労働法 💼",
    btnsend: "送信",
    btnanswer: "回答を入力してください！",
  },
};
// 현재 언어
let currentLanguage = "ko";

// 언어모달 관련 DOM 요소 가져오기
const languageModal = document.getElementById("languageModal");
const closeModalButton = document.getElementById("closeModal");
const langgeButton = document.getElementById("lang-btn");
const languageList = document.getElementById("languageList");

// 페이지 로드 시 모달 초기화 (숨김 상태로 설정)
languageModal.style.display = "none"; // 모달 숨김

// 모달 열기 버튼 이벤트
langgeButton.addEventListener("click", () => {
  if (languageModal) {
    languageModal.style.display = "flex"; // 모달 표시
  } else {
    console.error("모달 요소를 찾을 수 없습니다.");
  }
});

// 모달 닫기 버튼 이벤트
closeModalButton.addEventListener("click", () => {
  if (languageModal) {
    languageModal.style.display = "none"; // 모달 숨김
  } else {
    console.error("모달 요소를 찾을 수 없습니다.");
  }
});

// 언어 선택 이벤트
languageList.addEventListener("click", (event) => {
  const selectedLang = event.target.getAttribute("data-lang");
  if (selectedLang) {
    currentLanguage = selectedLang;
    updateLanguage(); // 화면 언어 업데이트
    languageModal.style.display = "none"; // 모달 닫기
  }
});

// 화면 언어 업데이트 함수
function updateLanguage() {
  const langData = translations[currentLanguage];
  addMessage(langData.welcomeMessage, "bot");

  // 각 요소의 텍스트를 업데이트

  document.getElementById("btnGuide").textContent = langData.btnguide;
  document.getElementById("btnPrep").textContent = langData.btnprep;
  document.getElementById("btnLease").textContent = langData.btnLease;
  document.getElementById("btnInsurance").textContent = langData.btnInsurance;
  document.getElementById("btnLaborLaw").textContent = langData.btnLaborLaw;
  document.getElementById("sendButton").textContent = langData.btnsend;
}

// 언어 선택 변경 이벤트
function addMessage(text, type) {
  const messageBox = document.createElement("div");
  messageBox.classList.add("chat-message");
  if (type === "bot") {
    messageBox.classList.add("bot");
  }

  messageBox.textContent = text;

  // 채팅 영역에 추가
  chatContainer.appendChild(messageBox);
}
document.getElementById("languageList").addEventListener("click", (event) => {
  const selectedLang = event.target.getAttribute("data-lang");
  if (selectedLang) {
    currentLanguage = selectedLang;
    addMessage(`${event.target.textContent}`, "bot");
  }
});

//---------------------------채팅--------------------/

//과거 대화 AI 요약 및 저장 기능을 추가한..
// 메시지 추가 함수
function addMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", sender);
  messageElement.textContent = message;

  chatbox.appendChild(messageElement);

  return messageElement; // 새로 추가된 메시지 요소 반환
}

// 메시지 전송 이벤트
document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// 메시지 전송 함수
function sendMessage() {
  const inputField = document.getElementById("userInput");
  const userMessage = inputField.value.trim(); // 사용자가 입력한 텍스트

  if (userMessage === "") return; // 빈 입력 방지

  console.log("User Message:", userMessage);
  const userMessageElement = addMessage(userMessage, "user");

  // 사용자 메시지를 화면에 표시
  userMessageElement.scrollIntoView({ behavior: "smooth", block: "end" });

  // API를 통해 봇 응답 생성
  getBotResponse(userMessage).then((botMessage) => {
    console.log("Bot Message:", botMessage);
    // 봇의 메시지를 약간의 지연 후에 추가
    setTimeout(() => {
      const botMessageElement = addMessage(botMessage, "bot");

      // 봇 메시지를 화면에 표시
      botMessageElement.scrollIntoView({ behavior: "smooth", block: "end" });

      // 대화 기록 요약 및 저장 (선택적 기능)
      saveConversationAndSummarize(userMessage, botMessage);
    }, 500); // 0.5초 지연
  });

  inputField.value = ""; // 입력 필드 초기화
}

// OpenAI API 호출 함수
async function getBotResponse(userMessage) {
  const url =
    "http://128.134.103.140:8000/ask?question=" +
    encodeURIComponent(userMessage);

  console.log("request url", url);
  try {
    const response = await fetch(url, {
      method: "GET", // POST를 사용하는 경우 JSON 데이터 설정 필요
    });

    console.log("response", response);
    // 응답 데이터 파싱
    const data = await response.json();

    // API 응답에서 answer 또는 reply 값을 반환
    return (
      data.answer || data.reply || "죄송합니다, 응답을 생성할 수 없습니다."
    );
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "서버와 통신 중 문제가 발생했습니다.";
  }
}

// ------------예린님 압정 ! ---------------//
/*--------------------------------------------과거 대화 part-------------------------------------------------------------------------------------*/
// 과거 대화 모달 관련 DOM 요소
const historyModal = document.getElementById("historyModal");
const closeHistoryModal = document.getElementById("closeHistoryModal");
const btnList = document.getElementById("btnlist");
const historyList = document.getElementById("historyList");

// 대화 히스토리 저장소 (예제 데이터)
let conversationHistory = [
  {
    date: "2024-12-17",
    summary: "AI 챗봇 사용법 설명",
    keywords: ["챗봇", "사용법", "AI"],
    details: "오늘은 AI 챗봇의 사용법과 주요 기능에 대해 논의했습니다.",
  },
  {
    date: "2024-12-16",
    summary: "프로젝트 일정 논의",
    keywords: ["프로젝트", "일정", "계획"],
    details: "프로젝트 일정과 팀의 작업 분담에 대해 논의했습니다.",
  },
];

// 초기화: 로컬 스토리지에서 히스토리 불러오기
document.addEventListener("DOMContentLoaded", () => {
  const savedHistory = localStorage.getItem("conversationHistory");
  if (savedHistory) {
    conversationHistory = JSON.parse(savedHistory); // 저장된 히스토리 로드
  }
  historyModal.style.display = "none"; // 모달 숨김
  console.log("페이지 로드 완료");
});

// 모달 열기
btnList.addEventListener("click", () => {
  renderHistory(); // 대화 목록 렌더링
  historyModal.style.display = "block"; // 모달 표시
});

// 모달 닫기
closeHistoryModal.addEventListener("click", () => {
  historyModal.style.display = "none"; // 모달 숨김
});

// 대화 목록 렌더링 함수
function renderHistory() {
  if (!historyList) {
    console.error("historyList 요소를 찾을 수 없습니다.");
    return;
  }

  historyList.innerHTML = ""; // 기존 목록 초기화
  conversationHistory.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.dataset.index = index; // 인덱스 저장

    // 날짜 표시
    const date = document.createElement("div");
    date.className = "history-item-date";
    date.textContent = item.date;

    // 요약 표시
    const summary = document.createElement("div");
    summary.className = "history-item-summary";
    summary.textContent = item.summary;

    // 키워드 표시
    const keywords = document.createElement("div");
    keywords.className = "history-item-keywords";
    keywords.textContent = `키워드: ${item.keywords.join(", ")}`;

    // 항목 구성
    li.appendChild(date);
    li.appendChild(summary);
    li.appendChild(keywords);

    // 클릭 이벤트 추가 (세부 내용 보기)
    li.addEventListener("click", () => {
      showDetails(item);
    });

    historyList.appendChild(li);
  });
}

// 대화 세부 내용 표시 함수
function showDetails(item) {
  alert(
    `날짜: ${item.date}\n요약: ${item.summary}\n세부 내용: ${item.details}`
  );
}

// 히스토리 업데이트 및 저장 함수
function saveHistoryToLocalStorage() {
  localStorage.setItem(
    "conversationHistory",
    JSON.stringify(conversationHistory)
  );
}

// 새로운 대화 추가 예제
function addNewConversation(date, summary, keywords, details) {
  const newConversation = { date, summary, keywords, details };
  conversationHistory.push(newConversation); // 저장소에 추가
  saveHistoryToLocalStorage(); // 로컬 스토리지에 저장
}
// -------------------음성 인식-----------------//
if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
  alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
}

const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.lang = "ko-KR";

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  addMessage(transcript, "user");

  // 봇 응답 처리
  getBotResponse(transcript).then((botMessage) => {
    addMessage(botMessage, "bot");
  });
};

recognition.onerror = (event) => {
  console.error("음성 인식 에러:", event.error);
  if (event.error === "no-speech") {
    alert("음성이 인식되지 않았습니다. 다시 시도해주세요.");
  }
};

// 음성 인식 한 번 실행 후 종료
document.getElementById("voiceButton").addEventListener("click", () => {
  recognition.start();
});

//------------- 원하는 대화 저장 기능 --------------//
const chatbox = document.getElementById("chatbox");
const logBtn = document.querySelector(".log-btn");
const inputContainer = document.querySelector(".input-container");
const mainContainer = document.querySelector(".main-container");
const choiceContainer = document.querySelector(".choice-container");

let selectedMessages = [];

// 메시지 선택 이벤트 핸들러
function enableMessageSelection() {
  chatbox.addEventListener("click", messageSelectionHandler);
}

// 메시지 선택 이벤트 핸들러 함수
function messageSelectionHandler(event) {
  if (event.target.classList.contains("chat-message")) {
    const msg = event.target;
    msg.classList.toggle("selected");

    const messageText = msg.textContent.trim();
    if (msg.classList.contains("selected")) {
      selectedMessages.push({
        text: messageText,
        sender: msg.classList.contains("user") ? "user" : "bot", // sender 정보 추가
      });
    } else {
      selectedMessages = selectedMessages.filter(
        (message) => message.text !== messageText // 선택 해제 시 제거
      );
    }
  }
}

// 선택된 메시지 저장 함수
function saveMessages(title) {
  if (selectedMessages.length === 0) {
    alert("저장할 메시지를 선택해주세요.");
    return;
  }

  const savedMessages = selectedMessages.slice(); // 메시지 복사

  // 저장 후 선택된 메시지 초기화
  selectedMessages = [];
  const allMessages = document.querySelectorAll(".chat-message");
  allMessages.forEach((msg) => msg.classList.remove("selected"));
  alert("메시지가 저장되었습니다.");

  // 제목에 해당하는 버튼 생성
  const createdButton = document.createElement("button");
  createdButton.textContent = title;
  createdButton.className = "generated-button";
  choiceContainer.appendChild(createdButton);

  // 생성된 버튼 클릭 시 저장된 메시지 표시
  createdButton.addEventListener("click", () => {
    displaySavedMessages(savedMessages);
  });
}

// 저장된 메시지 화면에 표시 함수
function displaySavedMessages(savedMessages) {
  // 이전에 표시된 메시지들 제거
  const existingMessagesContainer = document.querySelector(
    ".saved-messages-container"
  );
  if (existingMessagesContainer) {
    existingMessagesContainer.remove();
  }

  // 새로운 컨테이너 생성
  const messagesContainer = document.createElement("div");
  messagesContainer.className = "chat-container";

  // 높이를 설정
  messagesContainer.style.height = "88vh"; // 80% 화면 높이로 설정

  // LawBot 로고 추가
  const logoDiv = document.createElement("div");
  logoDiv.className = "logo";
  logoDiv.style.marginBottom = "30px";
  messagesContainer.appendChild(logoDiv);
  // 닫기 버튼 추가
  const closeButton = document.createElement("button");
  closeButton.className = "close-btn"; // CSS 클래스를 지정
  closeButton.textContent = "🔙";
  messagesContainer.appendChild(closeButton);
  // list-btn 숨기기
  const listBtn = document.querySelector(".list-btn");
  if (listBtn) {
    listBtn.style.display = "none"; // messagesContainer가 표시되면 list-btn 숨기기
  }

  // 새로운 chat-box 생성
  const chatBox = document.createElement("div");
  chatBox.className = "chat-box";
  chatBox.style.height = "69vh";

  // 저장된 메시지들을 화면에 추가
  savedMessages.forEach((message) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");

    // 메시지가 'user'일 경우 user 스타일 적용, 아니면 bot 스타일
    if (message.sender === "user") {
      messageDiv.classList.add("user");
    } else if (message.sender === "bot") {
      messageDiv.classList.add("bot");
    }

    messageDiv.textContent = message.text;
    chatBox.appendChild(messageDiv);
  });

  // chat-box를 chat-container에 추가
  messagesContainer.appendChild(chatBox);

  // 메시지 컨테이너를 화면에 추가
  mainContainer.appendChild(messagesContainer); // 닫기 버튼 클릭 시 동작 정의
  closeButton.addEventListener("click", () => {
    // log-btn을 클릭하기 전 상태로 돌아가도록 설정
    inputContainer.style.display = "block"; // 입력창을 다시 보이게
    messagesContainer.remove(); // chat-container를 삭제하여 화면에서 제거
    listBtn.style.display = "block"; // list-btn 다시 보이기
  });
}
// ------------------- + 버튼 관련 이벤트 -------------//
logBtn.addEventListener("click", () => {
  inputContainer.style.display = "none"; // 대화 입력창 숨기기

  // 기존 log-container가 있으면 제거
  const existingLogContainer = document.querySelector(".log-container");
  if (existingLogContainer) {
    existingLogContainer.remove();
  }

  // 새로운 log-container 생성
  const logContainer = document.createElement("div");
  logContainer.className = "log-container";

  const instructionText = document.createElement("div");
  instructionText.textContent =
    "저장하고 싶은 대화를 선택하고 하단에 제목을 입력해주세요. 우측의 확인 버튼을 클릭 시 응답이 저장됩니다.";
  instructionText.className = "instruction-text";
  logContainer.appendChild(instructionText);

  // 입력 필드와 확인 버튼 추가
  const inputButtonContainer = document.createElement("div");
  inputButtonContainer.className = "input-button-container";

  const inputField2 = document.createElement("input");
  inputField2.type = "text";
  inputField2.placeholder = "제목을 입력하세요";
  inputButtonContainer.appendChild(inputField2);

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "확인";
  inputButtonContainer.appendChild(confirmBtn);

  // 'closeButton' 추가
  const closeButton = document.createElement("button");
  closeButton.className = "close-btn";
  closeButton.textContent = "🔙";
  logContainer.appendChild(closeButton);

  const listBtn = document.querySelector(".list-btn");
  if (listBtn) {
    listBtn.style.display = "none"; // messagesContainer가 표시되면 list-btn 숨기기
  }
  mainContainer.appendChild(logContainer);
  logContainer.appendChild(inputButtonContainer);

  // closeButton 클릭 시 원래 상태로 돌아가기
  closeButton.addEventListener("click", () => {
    logContainer.remove(); // log-container를 삭제하여 화면에서 제거
    inputContainer.style.display = "block"; // 입력창을 다시 보이게
  });

  // confirmBtn 클릭 시 제목 입력 및 메시지 저장
  confirmBtn.addEventListener("click", () => {
    const title = inputField2.value.trim(); // 제목을 inputField2에서 가져옴
    if (title) {
      // 선택된 메시지를 저장
      saveMessages(title);

      // 메시지 저장 후 input-container 다시 보이기
      logContainer.remove(); // logContainer 삭제
      inputContainer.style.display = "block"; // input-container 다시 보이기
    } else {
      alert("제목을 입력해주세요.");
    }
  });

  // 메시지 선택 활성화 (log-btn 클릭 시에만)
  enableMessageSelection();
});
