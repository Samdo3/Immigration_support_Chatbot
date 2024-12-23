// ---------------------잔상 제거하고 홈페이지 이동 / 애니메이션 효과 추가 ---------------------//

// btnword 클릭 시
document.getElementById("btnword").addEventListener("click", () => {
  const languageModal = document.getElementById("languageModal");

  // 모달 숨기기
  if (languageModal) {
    languageModal.style.display = "none";
  }
  // Word.html 파일 열기
  window.location.href = "word.html";
});

// btnmain 클릭 시
document.getElementById("btnmain").addEventListener("click", () => {
  const languageModal = document.getElementById("languageModal");

  // 모달 숨기기
  if (languageModal) {
    languageModal.style.display = "none";
  }

  // index.html 파일 열기
  window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const languageModal = document.getElementById("languageModal");

  // 페이지 로드 시 모달 숨기기
  if (languageModal) {
    languageModal.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in"); // 페이지 로드 후 fade-in 애니메이션 적용
});

//----------------------언어 변경 -------------------------//
// 언어별 번역 데이터
const translations = {
  ko: {
    welcomeMessage: "안녕하세요! 무엇을 도와드릴까요?",
    btnsend: "전송",
    instructionText:
      "저장하고 싶은 대화를 선택하고 하단에 제목을 입력해주세요. 우측의 확인 버튼을 클릭 시 응답이 저장됩니다.",
    confirmBtnText: "확인",
  },
  en: {
    welcomeMessage: "Hello! How can I assist you?",
    btnsend: "Send",
    instructionText:
      "Select the conversation you want to save and enter a title below. Clicking the confirm button on the right will save the response.",
    confirmBtnText: "OK",
  },
  hi: {
    welcomeMessage: "नमस्ते! मैं आपकी किस प्रकार मदद कर सकता हूँ?",
    btnsend: "भेजना",
    instructionText:
      "आप जिस बातचीत को सहेजना चाहते हैं, उसे चुनें और नीचे एक शीर्षक दर्ज करें। दाहिने ओर पुष्टि बटन पर क्लिक करने से प्रतिक्रिया सहेज ली जाएगी।",
    confirmBtnText: "ठीक है",
  },
  vi: {
    welcomeMessage: "Xin chào! Tôi có thể giúp gì cho bạn?",
    btnsend: "Gửi",
    instructionText:
      "Chọn cuộc trò chuyện bạn muốn lưu và nhập tiêu đề bên dưới. Bấm nút xác nhận bên phải để lưu phản hồi.",
    confirmBtnText: "Xác nhận",
  },
  ru: {
    welcomeMessage: "Здравствуйте! Как я могу помочь вам?",
    btnsend: "Отправить",
    instructionText:
      "Выберите беседу, которую хотите сохранить, и введите заголовок ниже. Нажатие кнопки подтверждения справа сохранит ответ.",
    confirmBtnText: "ОК",
  },
  zh: {
    welcomeMessage: "你好！我能为你做些什么？",
    btnsend: "发送",
    instructionText:
      "选择您要保存的对话并在下方输入标题。点击右侧的确认按钮将保存响应。",
    confirmBtnText: "确定",
  },
  th: {
    welcomeMessage: "สวัสดี! ฉันช่วยอะไรคุณได้บ้าง?",
    btnsend: "ส่ง",
    instructionText:
      "เลือกการสนทนาที่คุณต้องการบันทึกและกรอกหัวข้อด้านล่าง การคลิกปุ่มยืนยันที่ด้านขวาจะบันทึกการตอบกลับ",
    confirmBtnText: "ตกลง",
  },
  uz: {
    welcomeMessage: "Salom! Qanday yordam bera olaman?",
    btnsend: "Yuborish",
    instructionText:
      "Saqlamoqchi bo'lgan suhbatni tanlang va quyida sarlavha kiriting. O'ngdagi tasdiqlash tugmasini bosish javobni saqlaydi.",
    confirmBtnText: "OK",
  },
  tl: {
    welcomeMessage: "Kamusta! Paano kita matutulungan?",
    btnsend: "Ipadala",
    instructionText:
      "Piliin ang pag-uusap na nais mong i-save at maglagay ng pamagat sa ibaba. I-click ang confirm na button sa kanan upang i-save ang sagot.",
    confirmBtnText: "OK",
  },
  ja: {
    welcomeMessage: "こんにちは！どのようにお手伝いできますか？",
    btnsend: "送信",
    instructionText:
      "保存したい会話を選択し、下にタイトルを入力してください。右側の確認ボタンをクリックすると、返信が保存されます。",
    confirmBtnText: "確認",
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

document.addEventListener("DOMContentLoaded", () => {
  updateLanguage();
});

// 화면 언어 업데이트 함수
function updateLanguage() {
  const langData = translations[currentLanguage];

  document.getElementById("sendButton").textContent = langData.btnsend;
  // 'log-container' 텍스트 업데이트
  const instructionText = document.querySelector(".instruction-text");
  const confirmBtn = document.querySelector(".input-button-container button");

  if (instructionText) {
    instructionText.textContent = langData.instructionText;
  }

  if (confirmBtn) {
    confirmBtn.textContent = langData.confirmBtnText;
  }
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

  // 사용자 메시지를 화면에 표시 후, 스크롤을 맨 아래로
  messageBox.scrollIntoView({ behavior: "smooth", block: "end" });
}

document.getElementById("languageList").addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    // 클릭된 요소가 <li>인지 확인
    const selectedLang = event.target.getAttribute("data-lang");
    if (selectedLang) {
      currentLanguage = selectedLang; // 선택된 언어로 업데이트
      const langData = translations[currentLanguage]; // 해당 언어의 데이터 가져오기

      // 첫 번째 메시지: 선택된 언어 이름을 봇 메시지로 추가
      addMessage(`${event.target.textContent}`, "bot");

      // 두 번째 메시지: 언어에 맞는 welcomeMessage를 봇 메시지로 추가
      setTimeout(() => {
        const botMessageElement = addMessage(langData.welcomeMessage, "bot");
        botMessageElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }); // 처음으로 돌아가게 설정
      }, 100); // 약간의 지연 후 추가 (0.3초)

      // 언어 모달 닫기
      languageModal.style.display = "none";
    }
  }
});

//---------------------------채팅--------------------/
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

      // 음성 버튼 생성
      const voiceButton = document.createElement("button");
      voiceButton.textContent = "🎧"; // 초기 아이콘 설정
      voiceButton.className = "audio-button";

      // 음성 읽기 및 중지 상태 관리
      let isSpeaking = false;
      function createUtterance(text, language) {
        const voices = speechSynthesis.getVoices();

        // 필리핀어와 우즈벡어는 강제로 다른 언어로 대체
        if (language === "tl") {
          language = "en"; // 필리핀어 -> 영어
        } else if (language === "uz") {
          language = "ru"; // 우즈벡어 -> 러시아어
        }

        // 대체된 언어에 맞는 음성 가져오기
        const voice = voices.find((v) => v.lang.startsWith(language)) || null;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = voice ? voice.lang : language; // 대체된 언어 코드 설정
        utterance.voice = voice;
        return utterance;
      }

      // 음성 버튼 클릭 이벤트
      voiceButton.addEventListener("click", () => {
        if (isSpeaking) {
          // 음성 중지
          speechSynthesis.cancel();
          isSpeaking = false;
          voiceButton.textContent = "🎧"; // 버튼 아이콘을 다시 "🎧"로 변경
        } else {
          // 음성 읽기
          speechSynthesis.cancel(); // 이전에 재생 중인 음성을 중지
          const utterance = createUtterance(
            botMessage,
            currentLanguage // 현재 설정된 언어
          );
          speechSynthesis.speak(utterance); // 새로 읽기 시작
          isSpeaking = true;
          voiceButton.textContent = "⬜️"; // 버튼 아이콘을 "⏹️"로 변경

          // 음성이 끝나면 상태 초기화
          utterance.onend = () => {
            isSpeaking = false;
            voiceButton.textContent = "🎧"; // 음성 종료 시 아이콘 초기화
          };
        }
      });

      // 봇 메시지와 버튼을 포함할 컨테이너 생성
      const botMessageContainer = document.createElement("div");
      botMessageContainer.classList.add("bot-message-container");
      botMessageContainer.appendChild(botMessageElement);
      botMessageContainer.appendChild(voiceButton); // 버튼을 오른쪽에 추가

      // 컨테이너를 채팅박스에 추가
      const chatbox = document.getElementById("chatbox");
      chatbox.appendChild(botMessageContainer);

      // 봇 메시지를 화면에 표시
      botMessageContainer.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  });

  inputField.value = ""; // 입력 필드 초기화
}
// ------------------------API 불러오기 --------------------------//
// OpenAI API 호출 함수
async function getBotResponse(userMessage) {
  const response = await fetch(
    `https://lawbot.ddns.net/ask/keyword?question=${encodeURIComponent(
      userMessage
    )}`
  );
  try {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

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

// -------------------음성 인식-----------------//
if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
  alert("This browser does not support speech recognition.");
}

const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.lang = "ko-KR";

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;

  // 사용자 메시지를 화면에 표시
  addMessage(transcript, "user");

  // 사용자 메시지 스크롤 효과 추가
  const userMessageElement = document.querySelector(
    ".chat-message.user:last-child"
  );
  userMessageElement.scrollIntoView({ behavior: "smooth", block: "end" });

  // 봇 응답 처리
  getBotResponse(transcript).then((botMessage) => {
    addBotMessageWithVoice(botMessage);
  });
};

recognition.onerror = (event) => {
  console.error("Voice recognition error:", event.error);
  if (event.error === "no-speech") {
    alert("The voice was not recognized. Please try again.");
  }
};

// 음성 인식 한 번 실행 후 종료
document.getElementById("voiceButton").addEventListener("click", () => {
  recognition.start();
});

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
    addBotMessageWithVoice(botMessage);
  });

  inputField.value = ""; // 입력 필드 초기화
}

function addBotMessageWithVoice(botMessage) {
  console.log("Bot Message:", botMessage);

  // 봇의 메시지를 약간의 지연 후에 추가
  setTimeout(() => {
    const botMessageElement = addMessage(botMessage, "bot");

    // 음성 버튼 생성
    const voiceButton = document.createElement("button");
    voiceButton.textContent = "🎧"; // 초기 아이콘 설정
    voiceButton.className = "audio-button";

    // 음성 읽기 및 중지 상태 관리
    let isSpeaking = false;
    let voices = [];

    // 음성 리스트 로드가 완료되면 업데이트
    speechSynthesis.addEventListener("voiceschanged", () => {
      voices = speechSynthesis.getVoices();
    });
    function createUtterance(text, language) {
      const voices = speechSynthesis.getVoices();

      // 필리핀어와 우즈벡어는 강제로 다른 언어로 대체
      if (language === "tl") {
        language = "en"; // 필리핀어 -> 영어
      } else if (language === "uz") {
        language = "ru"; // 우즈벡어 -> 러시아어
      }

      // 대체된 언어에 맞는 음성 가져오기
      const voice = voices.find((v) => v.lang.startsWith(language)) || null;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voice ? voice.lang : language; // 대체된 언어 코드 설정
      utterance.voice = voice;
      return utterance;
    }

    // 음성 버튼 클릭 이벤트
    voiceButton.addEventListener("click", () => {
      if (isSpeaking) {
        // 음성 중지
        speechSynthesis.cancel();
        isSpeaking = false;
        voiceButton.textContent = "🎧"; // 버튼 아이콘을 다시 "🎧"로 변경
      } else {
        // 음성 읽기
        speechSynthesis.cancel(); // 이전에 재생 중인 음성을 중지
        const utterance = createUtterance(botMessage, "ko-KR"); // 한국어로 설정
        speechSynthesis.speak(utterance); // 새로 읽기 시작
        isSpeaking = true;
        voiceButton.textContent = "⬜️"; // 버튼 아이콘을 "⬜️"로 변경

        // 음성이 끝나면 상태 초기화
        utterance.onend = () => {
          isSpeaking = false;
          voiceButton.textContent = "🎧"; // 음성 종료 시 아이콘 초기화
        };
      }
    });

    // 봇 메시지와 버튼을 포함할 컨테이너 생성
    const botMessageContainer = document.createElement("div");
    botMessageContainer.classList.add("bot-message-container");
    botMessageContainer.appendChild(botMessageElement);
    botMessageContainer.appendChild(voiceButton); // 버튼을 오른쪽에 추가

    // 컨테이너를 채팅박스에 추가
    const chatbox = document.getElementById("chatbox");
    chatbox.appendChild(botMessageContainer);

    // 봇 메시지를 화면에 표시
    botMessageContainer.scrollIntoView({ behavior: "smooth", block: "end" });
  }, 500);
}

function addMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", sender);
  messageElement.textContent = message;
  const chatbox = document.getElementById("chatbox");
  chatbox.appendChild(messageElement);
  return messageElement;
}

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
    alert("Please select the message you want to save.");
    return;
  }

  const savedMessages = selectedMessages.slice(); // 메시지 복사

  // 저장 후 선택된 메시지 초기화
  selectedMessages = [];
  const allMessages = document.querySelectorAll(".chat-message");
  allMessages.forEach((msg) => msg.classList.remove("selected"));

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
logBtn.addEventListener("mousedown", () => {
  logBtn.style.backgroundColor = "#bee7ff"; // 클릭 시 배경색 변경
});

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
  instructionText.className = "instruction-text";
  logContainer.appendChild(instructionText);

  // 입력 필드와 확인 버튼 추가
  const inputButtonContainer = document.createElement("div");
  inputButtonContainer.className = "input-button-container";

  const inputField2 = document.createElement("input");
  inputField2.type = "text";
  inputButtonContainer.appendChild(inputField2);

  const confirmBtn = document.createElement("button");
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

  updateLanguage(); // 언어에 맞게 텍스트 업데이트

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
      alert("No!");
    }
  });

  // 메시지 선택 활성화 (log-btn 클릭 시에만)
  enableMessageSelection();
});
