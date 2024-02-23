const letra = document.getElementById("ContenedorLetra");
const opciones = document.getElementById("ContenedorOpciones");
const userInputSection = document.getElementById("user-input-section");
const nuevoJ = document.getElementById("NuevoJuego");
const nuevoB = document.getElementById("BotonJugarDeNuevo");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Vector de palabras
let optionesP = {

  Jugar: [
    "Mono", "Arbol", "Nariz", "Gusano", "Reloj", "Pantalla", "Tiempo", "Escolta", "Chimpance", "Vista", "Sonido", "Estructura", "Policia",
    "Rapido", "Energia",
  ]
};

//Contador
let ganadas = 0;
let contador = 0;

let elegirPalabra = "";

//Generador de palabras 
const generarPalabra = (optionValue) => {
  let OpcionBoton = document.querySelectorAll(".optionesP");
  OpcionBoton.forEach((boton) => {
    if (boton.innerText.toLowerCase() === optionValue) {
      boton.classList.add("active");
    }
    boton.disabled = true;
  });

  letra.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = optionesP[optionValue];
  elegirPalabra = optionArray[Math.floor(Math.random() * optionArray.length)];
  elegirPalabra = elegirPalabra.toUpperCase();

  //Remplaza las palabras por "dashes"
  let displayItem = elegirPalabra.replace(/./g, '<span class="dashes">_</span> ');

  userInputSection.innerHTML = displayItem;
};


//Mostrar botones
const displayOptions = () => {
  opciones.innerHTML += `<h3>Sin Oxigeno</h3>`;
  let boton = document.createElement("div");
  for (let value in optionesP) {
    boton.innerHTML += `<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5"><button class="optionesP " onclick="generarPalabra('${value}')">${value}</button></div>`;
  }
  opciones.appendChild(boton);
};

//Bloquear botones
const bloquear = () => {
  let botonOpciones = document.querySelectorAll(".optionesP");
  let botonLetras = document.querySelectorAll(".letters");

  botonOpciones.forEach((botonO) => {
    botonO.disabled = true;
  });

  //Desactivar letras
  botonLetras.forEach((botonL) => {
    botonL.disabled.true;
  });
  nuevoJ.classList.remove("hide");
};

const initializer = () => {
  ganadas = 0;
  contador = 0;

//Borra todo el contenido y oculta las letras y el botón de nuevo juego.
  userInputSection.innerHTML = "";
  opciones.innerHTML = "";
  letra.classList.add("hide");
  nuevoJ.classList.add("hide");
  letra.innerHTML = "";

  //Un for que crea los botones con las letras
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      let charArray = elegirPalabra.split("");
      let dashes = document.getElementsByClassName("dashes");
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            ganadas += 1;
            if (ganadas == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'</h2><p>Ganaste, la palabra es <br>"${elegirPalabra}"</p>`;
              bloquear();
            }
          }
        });
      } else {
        contador += 1;
        hombrecito(contador);
        if (contador == 7) {
          resultText.innerHTML = `<h2 class='lose-msg'</h2><p>Perdiste, la palabra era <br>"${elegirPalabra}"</p>`;
          bloquear();
        }
      }
      button.disabled = true;
    });
    letra.append(button);
  }

  displayOptions();
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};

//Creador de muñequito con canvas 
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();


  context.strokeStyle = 'white'; 
  context.fillStyle = '#65AFEB';
  context.lineWidth = 15;
  //Dibujar líneas
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const cuerda = () => {
    drawLine(200, 40, 200, 60); 
  };

  const cabeza = () => {
    context.beginPath();
    context.arc(200, 80, 20, 0, Math.PI * 2, true); 
    context.stroke(); // Dibuja el borde
    context.fill();
  };

  const torzo = () => {
    drawLine(200, 100, 200, 200); 
  };

  const brazoI = () => {
    drawLine(200, 120, 160, 160); 
  };

  const brazoD = () => {
    drawLine(200, 120, 240, 160); 
  };

  const piernaD = () => {
    drawLine(200, 200, 160, 240); 
  };

  const piernaI = () => {
    drawLine(200, 200, 240, 240); 
  };

  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.lineWidth = 5; 

    drawLine(200, 10, 200, 30); // Poste vertical
    drawLine(200, 30, 200, 40); // Cuerda superior
    drawLine(200, 10, 250, 10); // Poste horizontal
    drawLine(250, 10, 250, 300); // Poste vertical 
  };

  return { initialDrawing, cuerda, cabeza, torzo, brazoI, brazoD, piernaI, piernaD };
};

//Partes del muñequito guardadas en cases
const hombrecito = (contador) => {
  let { cuerda, cabeza, torzo, brazoI, brazoD, piernaI, piernaD } = canvasCreator();
  switch (contador) {
    case 1:
      cuerda();
      break;
    case 2:
      cabeza();
      break;
    case 3:
      torzo();
      break;
    case 4:
      brazoI();
      break;
    case 5:
      brazoD();
      break;
    case 6:
      piernaI();
      break;
    case 7:
      piernaD();
      break;
    default:
      break;
  }
};
window.onload = initializer;