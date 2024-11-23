document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");
  const testModal = document.getElementById("testModal");
  const testTitle = document.getElementById("testTitle");
  const testQuestion = document.getElementById("testQuestion");
  const testAnswer = document.getElementById("testAnswer");
  const result = document.getElementById("result");
  const nicknameInput = document.getElementById("nickname");
  const loginBtn = document.getElementById("loginBtn");

  let userProgress = JSON.parse(localStorage.getItem("progress")) || {};
  let nickname = localStorage.getItem("nickname") || null;
//   let nickname = null;

  const tests = [
    { question: "Traduce 'Hola' al coreano", answer: "안녕하세요" },
    { question: "Traduce '사랑' al español", answer: "amor" },
    { question: "Pregunta personal: ¿Cuál es mi color favorito?", answer: "azul" },
    { question: "Arma el puzzle interactivo (a implementar)", answer: "completado" },
  ];

  const today = new Date().getDate();

  // Handle Login
  loginBtn.addEventListener("click", () => {
    nickname = nicknameInput.value.trim();
    if (!nickname) {
      alert("Por favor, ingresa un nickname válido.");
      return;
    }
    localStorage.setItem("nickname", nickname);
    userProgress[nickname] = userProgress[nickname] || [];
    updateCalendar();
  });

  // Generate Calendar
  const updateCalendar = () => {
    calendar.innerHTML = "";
    for (let i = 1; i <= 24; i++) {
      const day = document.createElement("div");
      day.className = "day";
      day.textContent = i;
      if (i > today || (nickname && userProgress[nickname]?.includes(i))) {
        day.classList.add("locked");
      } else {
        day.addEventListener("click", () => openTest(i));
      }
      calendar.appendChild(day);
    }
  };

  const openTest = (day) => {
    const test = tests[(day - 1) % tests.length];
    testModal.style.display = "block";
    testTitle.textContent = `Prueba del Día ${day}`;
    testQuestion.textContent = test.question;
    testAnswer.value = "";
    result.textContent = "";

    document.getElementById("submitAnswer").onclick = () => {
      if (testAnswer.value.trim() === test.answer) {
        result.textContent = "¡Correcto!";
        result.style.color = "green";
        userProgress[nickname] = [...new Set([...userProgress[nickname], day])];
        localStorage.setItem("progress", JSON.stringify(userProgress));
        updateCalendar();
      } else {
        result.textContent = "Sigue intentando...";
        result.style.color = "red";
      }
    };
  };

  document.getElementById("closeModal").onclick = () => {
    testModal.style.display = "none";
  };

  // Initial Load
  if (nickname) {
    nicknameInput.value = nickname;
    updateCalendar();
  }
});