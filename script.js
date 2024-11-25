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
  
  const corea_esp1 = 'https://raw.githubusercontent.com/jsociaswork/calendarioAdviento2024/refs/heads/main/imgs/corea-esp1.jpg';
  const corea_esp2 = 'https://raw.githubusercontent.com/jsociaswork/calendarioAdviento2024/refs/heads/main/imgs/corea-esp2.jpg';
  const esp_corea1 = 'https://raw.githubusercontent.com/jsociaswork/calendarioAdviento2024/refs/heads/main/imgs/esp-corea1.jpg';
  // const esp_corea2 = 'https://raw.githubusercontent.com/jsociaswork/calendarioAdviento2024/refs/heads/main/imgs/esp-corea1.jpg';
  const esp_corea2 = '/imgs/esp-corea2.jpg';
  const puzzle = '/imgs/puzzle.png';
  // const puzzle2 = '/imgs/puzzle2.webp';
  const puzzle2 = '/imgs/puzzle.png';

  const tests = [
    { day: 1, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: esp_corea2 },
    { day: 2, type: "traduce-espanol", question: "Traduce '사랑' al español", answer: "amor", image: corea_esp2 },
    { day: 3, type: "pregunta-personal", question: "¿Cuál es mi color favorito?", answer: "azul", image: null },
    { day: 4, type: "pregunta-ella", question: "¿Qué comida te gusta más?", answer: "pizza", image: null},
    { day: 5, type: "pregunta-ella", question: "¿Qué comida te gusta más?", answer: "pizza", image: null },

    { day: 6, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: esp_corea1 },
    { day: 7, type: "traduce-espanol", question: "Traduce '사랑' al español", answer: "amor", image: corea_esp1 },
    { day: 8, type: "pregunta-personal", question: "¿Cuál es mi color favorito?", answer: "azul", image: null },
    { day: 9, type: "pregunta-ella", question: "¿Qué comida te gusta más?", answer: "pizza", image: null },
    { day: 10, type: "puzzle", question: "Arma el puzzle interactivo", answer: "completado", image: puzzle2 },

    { day: 11, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: esp_corea2 },
    { day: 12, type: "traduce-espanol", question: "Traduce '사랑' al español", answer: "amor", image: corea_esp2 },
    { day: 13, type: "pregunta-personal", question: "¿Cuál es mi color favorito?", answer: "azul", image: null },
    { day: 14, type: "pregunta-ella", question: "¿Qué comida te gusta más?", answer: "pizza", image: null },
    { day: 15, type: "pregunta-personal", question: "¿Cuál es mi color favorito?", answer: "azul", image: null },

    { day: 16, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: esp_corea2 },
    { day: 17, type: "traduce-espanol", question: "Traduce '사랑' al español", answer: "amor", image: corea_esp1 },
    { day: 18, type: "pregunta-personal", question: "¿Cuál es mi color favorito?", answer: "azul", image: null },
    { day: 19, type: "pregunta-ella", question: "¿Qué comida te gusta más?", answer: "pizza", image: null },
    { day: 20, type: "puzzle", question: "Arma el puzzle interactivo", answer: "completado", image: puzzle2 },

    { day: 21, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: esp_corea1 },
    { day: 22, type: "traduce-espanol", question: "Traduce '사랑' al español", answer: "amor", image: corea_esp2 },
    { day: 23, type: "puzzle", question: "Arma el puzzle interactivo", answer: "completado", image: puzzle2 },
    { day: 24, type: "puzzle", question: "Arma el puzzle interactivo", answer: "completado", image: puzzle },
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
      
      dayElement.style.border = "2px solid black";

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

  const snowflakesContainer = document.querySelector('.snowflakes');

  // Generar copos de nieve aleatorios
  function createSnowflakes() {
    for (let i = 0; i < 50; i++) { // Cambia el número según la densidad deseada
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      let snowflakeSymbol;
      const mr1 = Math.random() > 0.5;
      const mr2 = Math.random() > 0.5;
      if (mr1) {
        snowflakeSymbol = '❄';
      } else if (mr2) {
        snowflakeSymbol = '❅';
      } else {
        snowflakeSymbol = '❆';
      }
      snowflake.textContent =snowflakeSymbol;
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.top = Math.random() * 100 + 'vw';
      snowflake.style.animationDuration = Math.random() * 3 + 4 + 's'; // Duración de caída
      snowflake.style.animationDelay = Math.random() * 5 + 's'; // Retraso inicial
      snowflake.style.fontSize = Math.random() * 1.5 + 0.5 + 'rem'; // Tamaño variable
      snowflakesContainer.appendChild(snowflake);
    }
  }

  // createSnowflakes();

});
