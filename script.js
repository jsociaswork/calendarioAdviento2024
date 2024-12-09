/*
commit 2 algunas imagenes
, estilos por type de pregunta
, guardar local storage el progreso
, wip imgs puzzle y las pruebas ya realizadas marcarlas.
*/
document.addEventListener("DOMContentLoaded", () => {
  // Impedir clic derecho
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  // Impedir selección de texto
  document.addEventListener("selectstart", (event) => event.preventDefault());

  // Impedir copia con teclado
  document.addEventListener("copy", (event) => event.preventDefault());
  
  const today = new Date().getDate();

  // let today = new Date();
  // const dayOffset = 9; // Cambia según necesites
  // const specificDate = new Date(today);
  // today.setDate(today.getDate() + dayOffset);
  // console.log(today.getDate())
  // today = today.getDate();

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
  const esp_corea2 = 'https://raw.githubusercontent.com/jsociaswork/calendarioAdviento2024/refs/heads/main/imgs/esp-corea2.jpg';
  const puzzle = 'https://raw.githubusercontent.com/jsociaswork/calendarioAdviento2024/refs/heads/main/imgs/puzzle.png';
  // const puzzle2 = '/imgs/puzzle2.webp';
  const puzzle2 = 'https://raw.githubusercontent.com/jsociaswork/calendarioAdviento2024/refs/heads/main/imgs/puzzle.png';

  const tests = [
    { day: 1, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: esp_corea2, answers: ["안녕하세요", "안녕"], codigo: 'Coge las llaves del coche de él, ves y ábrelo' },
    { day: 2, type: "traduce-espanol", question: "Traduce '사랑해요' al español", answer: "te amo", image: corea_esp2, answers: ["te amo", "te quiero"], codigo:'Código 125' },
    { day: 3, type: "pregunta-personal", question: "¿Cuál es el color favorito de él 🐀?", answer: "녹색", errort: "Ahora en el idioma que estás practicando", image: null, codigo: 222, answers: ["녹색", "초록색"]},
    { day: 4, type: "pregunta-ella", question: "¿Cuál es el color favorito de ella?", answer: "h노란색", errort: "Ahora en el idioma que estás practicando", image: null, codigo: 111, answers: ["h노란색", "노란색"]},
    { day: 5, type: "pregunta-ella", question: "¿Qué comida le gusta más a mi sweetie 💛?", answer: "huevos fritos", image: null, answers: ["huevos fritos", "huevos fritos con patatas fritas", "huevos fritos y patatas fritas"], errort: "Esta vez sí que es en español 😜", codigo: 888 },
    // , errort: "Cuando aciertes te quedas con la bolsa 5 o con la X"
    { day: 6, type: "traduce-coreano", question: "Traduce 'Nariz, labio, oreja, ojo' al coreano", answer: "코, 입술, 귀, 눈", image: esp_corea1, answers: ["코, 입술, 귀, 눈","코, 입술, 눈, 귀","코, 귀, 입술, 눈","코, 귀, 눈, 입술","코, 눈, 입술, 귀","코, 눈, 귀, 입술","입술, 코, 귀, 눈","입술, 코, 눈, 귀","입술, 귀, 코, 눈","입술, 귀, 눈, 코","입술, 눈, 코, 귀","입술, 눈, 귀, 코","귀, 코, 입술, 눈","귀, 코, 눈, 입술","귀, 입술, 코, 눈","귀, 입술, 눈, 코","귀, 눈, 코, 입술","귀, 눈, 입술, 코","눈, 코, 입술, 귀","눈, 코, 귀, 입술","눈, 입술, 코, 귀","눈, 입술, 귀, 코","눈, 귀, 코, 입술","눈, 귀, 입술, 코"], codigo: 666, errort: "Da igual el orden, lo imporante es separar por ','" },
    { day: 7, type: "traduce-espanol", question: "Traduce '돼지' al español", answer: "cerdo", image: corea_esp1, codigo: 'Si sueñas con un cerdo, La Smorfia dice que se relaciona con el número 4.', errort: "豚 (Buta)" },
    { day: 8, type: "pregunta-personal", question: "¿Cuál es la comida favorita de él?", answer: "bistecs rebozados", ansers: ["todo menos la ensaladilla", "todo menos la mayonesa", "bistecs rebozados", "excepto la mayonesa", "excepto la ensaladilla"], image: null, codigo: 'Bolsa 8 disponible para abrir', errort: "Mmmm que hambre :P"},
    { day: 9, type: "pregunta-ella", question: "¿Qué cantante es el favorito de ella?", answer: "유기현", image: null, errort: "No no no, novata. La respuesta en Hangul o el nombre completo incluyendo el -", answers: ["Yoo Ki-hyun", "유기현"], codigo: "Bolsa Monsta X o código 102 (Solo 1 de las 2)" },
    { day: 10, type: "puzzle", question: "¿De dónde es la imagen del fondo?", answer: "hallstatt", image: puzzle2, codigo: "169" },

    { day: 11, type: "traduce-coreano", question: "이름이 뭐예요？", answer: "벨렌", answers: ["벨렌", "벨렌", "출생", "장면", "출생 장면", "벨렌치"], image: esp_corea2, codigo: "103" },
    { day: 12, type: "traduce-espanol", question: "Traduce '책' al español", answer: "libro", image: corea_esp2, codigo: "301" },
    { day: 13, type: "pregunta-personal", question: "¿Cuál es la película de Star Wars favorita de él?", answer: "Rogue one", image: null, codigo: "045"},
    { day: 14, type: "pregunta-ella", question: "¿Qué comida te gusta más?", answer: "pizza", image: null },
    { day: 15, type: "pregunta-personal", question: "¿Cuál es mi color favorito?", answer: "azul", image: null },

    { day: 16, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: esp_corea2 },
    { day: 17, type: "traduce-espanol", question: "Traduce '사랑' al español", answer: "amor", image: corea_esp1 },
    { day: 18, type: "pregunta-personal", question: "¿Cuál es mi color favorito?", answer: "azul", image: null },
    { day: 19, type: "pregunta-ella", question: "¿Qué comida te gusta más?", answer: "pizza", image: null },
    { day: 20, type: "puzzle", question: "Arma el puzzle interactivo", answer: "completado", image: puzzle2 },

    { day: 21, type: "traduce-coreano", question: "Traduce 'Hola' al coreano", answer: "안녕하세요", image: esp_corea1 },
    { day: 22, type: "traduce-espanol", question: "Traduce '사랑' al español", answer: "amor", image: corea_esp2 },
    { day: 23, type: "puzzle", question: "¿Qué significado tiene el 1er código?", answer: "aniversario", answers: ["nuestro aniversario"], image: puzzle2, codigo: "" },
    { day: 24, type: "puzzle", question: "Ordena el calendario igual que los eventos recibidos en whatssapp", answer: "completado", image: puzzle },
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
      if (dayData.day > today) {
        dayElement.classList.add("locked");
      } else if ((nickname && userProgress[nickname]?.includes(dayData.day))) {
        dayElement.classList.add("completed");
        setTimeout(() => {
          // Eliminar todos los event listeners sin necesidad de almacenarlos
          document.querySelectorAll('.day.completed').forEach(day1 => {
            const newDay = day1.cloneNode(true);  // Clona el nodo y elimina los listeners
            day1.parentNode.replaceChild(newDay, day1);  // Reemplaza el original
          });
  
          // Manejar el clic en los días con la clase 'completed'
          document.querySelectorAll('.day.completed').forEach(day2 => {
            day2.addEventListener('click', () => {
              let dayData2 = tests.find(test => test.day == day2.getAttribute('data-index'));
              let questionanswer =  dayData2.question + ': ' + dayData2.answer;
              dayData2 = { ...dayData2, showCodigo: true, questionAnswer: questionanswer };
              
              // Llamar a la función que abre el modal
              openTest(dayData2);
            });
          });
        }, 250);
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
    if ('[17,2,20,18,13,23,8,10,7,14,19,4,21,24,6,16,1,11,5,15,22,12,9,3]' == JSON.stringify(order)) {
      // alert('PRUEBA COMPLETADÍSIMA!!')
      let dayData = {
        question: 'PRUEBA COMPLETADÍSIMA!!',
        day: 24,
        finish: true
      }
      openTest(dayData)
    }
  }

  // Obtener el orden guardado en localStorage
  function getOrder(nickname) {
    const order = localStorage.getItem(`order_${nickname}`);
    return order ? JSON.parse(order) : null;
  }

  // Función para abrir el modal de la prueba
  function openTest(dayData) {
    if (dayData.showCodigo) {
      testModal.style.display = "block";
      testTitle.textContent = `Prueba del Día ${dayData.day}`;
      testQuestion.textContent = dayData.questionAnswer ?? dayData.question;
      testAnswer.style.display = 'none';
      document.getElementById("submitAnswer").style.display = 'none';
      result.textContent = dayData.codigo ?? "¡Correcto!";
      result.style.color = "green";
    } else {
      testModal.style.display = "block";
      testTitle.textContent = `Prueba del Día ${dayData.day}`;
      testQuestion.textContent = dayData.questionAnswer ?? dayData.question;
      testAnswer.value = "";
      result.textContent = "";
      testAnswer.style.display = 'block';
      document.getElementById("submitAnswer").style.display = 'block';
      if (dayData.finish) {
        testAnswer.style.display = 'none';
        document.getElementById("submitAnswer").style.display = 'none';
      }

      document.getElementById("submitAnswer").onclick = () => {
        let isCorrect = false;
        if (dayData.answers) {
          const userAnswer = testAnswer.value.trim().toLowerCase();
          isCorrect = dayData.answers.some(answer => userAnswer === answer.toLowerCase());
        }
        
        if (!isCorrect) {
          isCorrect = testAnswer.value.trim().toLowerCase() === dayData.answer.toLowerCase();
        }
        if (isCorrect) {
          result.textContent = dayData.codigo ?? "¡Correcto!";
          result.style.color = "green";
          document.getElementById("submitAnswer").style.display = 'none';
          userProgress[nickname] = [...new Set([...userProgress[nickname], dayData.day])];
          localStorage.setItem("progress", JSON.stringify(userProgress));
          updateCalendar(); // Actualizar el calendario después de completar la prueba
        } else {
          result.textContent = dayData.errort ?? "Sigue intentando...";
          result.style.color = "red";
        }
      }
    };
  }

  document.getElementById('info-icon').addEventListener('click', () => {
    const dayData = { 
        day: 'Informativa', 
        type: "traduce-coreano", 
        question: "Información: puedes iniciar sesión tantas veces como quieras, el progreso va por usuario y los usuarios solo se guardan en cada ordenador/dispositivo móvil. Puedes arrastrar los días para reordenarlos incluso aunque estén bloqueados. Colores: Negro ⚫ Prueba disponible | Rojo 🔴 no disponible hasta que llegue el día | Verde 🟢 superada y puedes volver a clicarla para ver la pregunta, la respuesta y...", 
        finish: true
    };
    openTest(dayData);
  });

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

  // completed

  // Eliminar todos los event listeners sin necesidad de almacenarlos
  document.querySelectorAll('.day.completed').forEach(day => {
    const newDay = day.cloneNode(true);  // Clona el nodo y elimina los listeners
    day.parentNode.replaceChild(newDay, day);  // Reemplaza el original
  });

  // Manejar el clic en los días con la clase 'completed'
  document.querySelectorAll('.day.completed').forEach(day => {
    day.addEventListener('click', () => {
      let dayData = JSON.parse(tests.find(test => test.day == day.getAttribute('data-index')));
      let questionanswer =  dayData.question + ': ' + dayData.answer
      dayData = { ...dayData, showCodigo: true, questionAnswer: questionanswer };
      
      // Llamar a la función que abre el modal
      openTest(dayData);
    });
  });

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

  createSnowflakes();

});
