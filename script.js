/*
commit 2 algunas imagenes
, estilos por type de pregunta
, guardar local storage el progreso
, wip imgs puzzle y las pruebas ya realizadas marcarlas.
*/
document.addEventListener("DOMContentLoaded", () => {

  const today = new Date().getDate();

  // Variables del DOM
  const loginBtn = document.getElementById("loginBtn");
  const nicknameInput = document.getElementById("nickname");
  const calendar = document.getElementById("calendar");
  const testModal = document.getElementById("testModal");
  const testTitle = document.getElementById("testTitle");
  const testQuestion = document.getElementById("testQuestion");
  const testAnswer = document.getElementById("testAnswer");
  const result = document.getElementById("result");
  const closeModal = document.getElementById("closeModal");

  const tests = [
    { day: 1, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: "/imgs/corea-esp2.jpg" },
    { day: 2, type: "traduce-espanol", question: "Traduce '사랑' al español", answer: "amor", image: "/imgs/esp-corea1.jpg" },
    { day: 3, type: "pregunta-personal", question: "¿Cuál es mi color favorito?", answer: "azul", image: "/imgs/personal.png" },
    { day: 4, type: "pregunta-ella", question: "¿Qué comida te gusta más?", answer: "pizza" },
    { day: 5, type: "puzzle", question: "Arma el puzzle interactivo", answer: "completado", image: "/imgs/puzzle.png" },
    { day: 6, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: "/imgs/corea-esp1.jpg" },
    { day: 7, type: "traduce-espanol", question: "Traduce '사랑' al español", answer: "amor", image: null },
    { day: 8, type: "pregunta-personal", question: "¿Cuál es mi color favorito?", answer: "azul", image: "/imgs/personal.png" },
    { day: 9, type: "pregunta-ella", question: "¿Qué comida te gusta más?", answer: "pizza" },
    { day: 10, type: "puzzle", question: "Arma el puzzle interactivo", answer: "completado", image: "/imgs/puzzle.png" },
    { day: 11, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: "/imgs/coreano.png" },
    { day: 12, type: "traduce-espanol", question: "Traduce '사랑' al español", answer: "amor", image: null },
    { day: 13, type: "pregunta-personal", question: "¿Cuál es mi color favorito?", answer: "azul", image: "/imgs/personal.png" },
    { day: 14, type: "pregunta-ella", question: "¿Qué comida te gusta más?", answer: "pizza" },
    { day: 15, type: "puzzle", question: "Arma el puzzle interactivo", answer: "completado", image: "/imgs/puzzle.png" },
    { day: 16, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: "/imgs/coreano.png" },
    { day: 17, type: "traduce-espanol", question: "Traduce '사랑' al español", answer: "amor", image: null },
    { day: 18, type: "pregunta-personal", question: "¿Cuál es mi color favorito?", answer: "azul", image: "/imgs/personal.png" },
    { day: 19, type: "pregunta-ella", question: "¿Qué comida te gusta más?", answer: "pizza" },
    { day: 20, type: "puzzle", question: "Arma el puzzle interactivo", answer: "completado", image: "/imgs/puzzle.png" },
    { day: 21, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: "/imgs/coreano.png" },
    { day: 22, type: "traduce-espanol", question: "Traduce '사랑' al español", answer: "amor", image: null },
    { day: 23, type: "pregunta-personal", question: "¿Cuál es mi color favorito?", answer: "azul", image: "/imgs/personal.png" },
    { day: 24, type: "pregunta-ella", question: "¿Qué comida te gusta más?", answer: "pizza" },
  ];

  // Inicialización de progreso del usuario
  let nickname = localStorage.getItem("nickname");
  let userProgress = JSON.parse(localStorage.getItem("progress")) || {};

  // Función para actualizar el calendario
  const updateCalendar = () => {
    calendar.innerHTML = "";
    let userOrder = getOrder(nickname);

    if (!userOrder) {
      // Si el orden no está guardado, generar un orden aleatorio
      userOrder = generateRandomOrder();
      saveOrder(nickname, userOrder);
    }

    userOrder.forEach((dayIndex) => {
      const dayData = tests[(dayIndex - 1) % tests.length];
      const dayElement = document.createElement("div");
      // dayElement.className = "day";
      dayElement.className = `day ${dayData.type}`;  // Añadir la clase del tipo de prueba
      dayElement.textContent = dayData.day;

      // Fondo basado en tipo de prueba o imagen
      if (dayData.image) {
        dayElement.style.backgroundImage = `url('${dayData.image}')`;
        dayElement.style.backgroundSize = "cover";
        dayElement.style.backgroundPosition = "center";
        dayElement.style.color = "black";
      }

      // Bloquear días no disponibles
      if (dayData.day > today || (nickname && userProgress[nickname]?.includes(dayData.day))) {
        dayElement.classList.add("locked");
      } else {
        // Evento de clic para abrir la prueba
        dayElement.addEventListener("click", () => openTest(dayData));
      }

      dayElement.setAttribute("draggable", "true");
      dayElement.dataset.index = dayData.day;
      calendar.appendChild(dayElement);
    });

    // Función de arrastrar y soltar
    addDragAndDrop(userOrder);
  };

  // Generar un orden aleatorio de los días
  function generateRandomOrder() {
    return Array.from({ length: 24 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
  }

  // Guardar el orden en localStorage
  function saveOrder(nickname, order) {
    localStorage.setItem(`order_${nickname}`, JSON.stringify(order));
  }

  // Obtener el orden guardado en localStorage
  function getOrder(nickname) {
    const order = localStorage.getItem(`order_${nickname}`);
    return order ? JSON.parse(order) : null;
  }

  // Función para abrir el modal de la prueba
  function openTest(dayData) {
    testModal.style.display = "block";
    testTitle.textContent = `Prueba del Día ${dayData.day}`;
    testQuestion.textContent = dayData.question;
    testAnswer.value = "";
    result.textContent = "";

    document.getElementById("submitAnswer").onclick = () => {
      if (testAnswer.value.trim() === dayData.answer) {
        result.textContent = "¡Correcto!";
        result.style.color = "green";
        userProgress[nickname] = [...new Set([...userProgress[nickname], dayData.day])];
        localStorage.setItem("progress", JSON.stringify(userProgress));
        updateCalendar(); // Actualizar el calendario después de completar la prueba
      } else {
        result.textContent = "Sigue intentando...";
        result.style.color = "red";
      }
    };
  }

  // Cerrar el modal de la prueba
  closeModal.addEventListener("click", () => {
    testModal.style.display = "none";
  });

  // Función de arrastrar y soltar
  function addDragAndDrop(order) {
    const draggables = document.querySelectorAll(".day");
    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.dataset.index);
      });

      draggable.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      draggable.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData("text/plain");
        const targetIndex = e.target.dataset.index;

        const draggedPos = order.indexOf(Number(draggedIndex));
        const targetPos = order.indexOf(Number(targetIndex));

        order.splice(draggedPos, 1);
        order.splice(targetPos, 0, Number(draggedIndex));

        saveOrder(nickname, order);
        updateCalendar(); // Re-renderizar el calendario después de cambiar el orden
      });
    });
  }

  // Función de login
  loginBtn.addEventListener("click", () => {
    nickname = nicknameInput.value.trim();
    if (!nickname) {
      alert("Por favor, ingresa un nickname válido.");
      return;
    }

    localStorage.setItem("nickname", nickname);
    userProgress[nickname] = userProgress[nickname] || [];
    updateCalendar(); // Actualizar el calendario después de iniciar sesión
  });

  // Inicializar el calendario cuando ya haya un nickname guardado
  if (nickname) {
    nicknameInput.value = nickname;
    updateCalendar();
  }

});
