for (let i = 0; i < 256; i++) {
    const div = document.createElement('div');
    div.classList.add('box');
    document.querySelector('.container').appendChild(div);
}

// document.getElementById('resize').addEventListener('click', function resizeGrid() {
//     while (true) {
//         let newSize = prompt("Enter new grid size (max. 100): " );
        
//         if (newSize === null) {
//             return;
//         }

//         if (newSize > 100) {
//             alert ("Size too large! Please enter a number less <= 100.");
//             continue;
//         } else {
//             const container = document.querySelector('.container');
//             container.textContent = '';
//             const containerSize = 480;
//             const boxSize = containerSize / newSize;
//             const totalBox = newSize * newSize;
            
//             for (let i = 0; i < totalBox; i++) {
//                 const div = document.createElement('div');
//                 div.classList.add('box');
//                 div.style.width = `${boxSize}px`;
//                 div.style.height = `${boxSize}px`;
//                 container.appendChild(div);
//             }
//             break;
//         }
//     }
// });

    


function darkenBoxColor () {
}

const body = document.querySelector("body");
const container = document.querySelector(".container");
const button = document.createElement("button");
const mainContainer = document.querySelector(".main-container");

button.textContent = "Click Me";
mainContainer.appendChild(container);

const squareDiv = {};

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    squareDiv[j] = document.createElement("div");
    squareDiv[j].classList.add("square-div");
    container.appendChild(squareDiv[j]);
  }
}

paintGrid();

/* GRID SLIDER */
let gridSlider = document.getElementById("myRange");
let output = document.getElementById("grid-size");
output.textContent = gridSlider.value;
gridSlider.oninput = function () {
  output.textContent = this.value;
  drawGrid(this.value);
  paintGrid();
};

function drawGrid(numOfSquareDivs) {
  const squareDivToRemove = document.querySelectorAll(".square-div");
  squareDivToRemove.forEach((div) => {
    container.removeChild(div);
  });

  if (numOfSquareDivs <= 100) {
    for (let i = 0; i < numOfSquareDivs; i++) {
      for (let j = 0; j < numOfSquareDivs; j++) {
        squareDiv[j] = document.createElement("div");
        squareDiv[j].classList.add("square-div");
        squareDiv[j].style.width = `${512 / numOfSquareDivs}px`;
        squareDiv[j].style.height = `${512 / numOfSquareDivs}px`;
        container.appendChild(squareDiv[j]);
      }
    }
  }
}
let isDrawing = 0;
let isMoving = 0;
let pass = 0,
  IncrementalyDarkening = 0;

function paintGrid(name) {
  const eachSquareDiv = document.querySelectorAll(".square-div");

  eachSquareDiv.forEach((div) => {
    div.addEventListener("mousedown", (e) => {
      isDrawing = 1;
      if (isIncrementalyDarkening) {
        IncrementalyDarkening = 1;
      }
    });
    div.addEventListener("mousemove", (e) => {
      if (isDrawing) {
        draw(e, color);
      }
      if (isRandomColorDrawing) {
        drawrandomColor(
          e,
          `rgb(${redComponent}, ${blueComponent}, ${greenComponent})`
        );
      }
      if (isErasing) {
        erase(e, "white");
      }
      if (IncrementalyDarkening) {
        darkenIncrementally(e);
      }
    });
    div.addEventListener("mouseup", (e) => {
      isDrawing = 0;
      IncrementalyDarkening = 0;
    });
  });
}

function draw(e, color) {
  if (isDrawing == 1 && e.button == 0) {
    e.target.style.backgroundColor = color;
  }
}

/*GRID CLEAR  */
const gridClear = document.querySelector(".grid-clear");
gridClear.addEventListener("click", () => {
  const eachSquareDiv = document.querySelectorAll(".square-div");
  eachSquareDiv.forEach((div) => {
    // console.log(div.style["background-color"]);
    if (div.style["background-color"] === "black") {
      div.removeAttribute("background-color");
    }
  });
});

/* TOGGLE GRID LINES */
const toggleGridLines = document.querySelector(".toggle-grid-lines");
toggleGridLines.addEventListener("click", () => {
  const eachSquareDiv = document.querySelectorAll(".square-div");
  eachSquareDiv.forEach((div) => {
    div.classList.toggle("grid-lines");
  });
});

/* RANDOM COLOUR */
let redComponent;
let greenComponent;
let blueComponent;

let isErasing = 0,
  isRandomColorDrawing = 0,
  color,
  isIncrementalyDarkening = 0;

const randomColor = document.querySelector(".random-color");
function drawrandomColor(e, color) {
  const eachSquareDiv = document.querySelectorAll(".square-div");
  eachSquareDiv.forEach((div) => {
    redComponent = Math.floor(Math.random() * 256);
    greenComponent = Math.floor(Math.random() * 256);
    blueComponent = Math.floor(Math.random() * 256);
    if (isDrawing == 1 && e.button == 0) {
      e.target.style.backgroundColor = `rgb(${redComponent}, ${blueComponent}, ${greenComponent})`;
    }
  });
}
randomColor.addEventListener("click", () => {
  this.active = !this.active;
  this.active ? (isRandomColorDrawing = 1) : (isRandomColorDrawing = 0);
});

/* ERASER */
function erase(e, color) {
  if (isDrawing == 1 && isErasing == 1 && e.button == 0) {
    e.target.style.backgroundColor = "white";
  }
}

const eraser = document.querySelector(".eraser");
eraser.addEventListener("click", () => {
  this.active = !this.active;
  this.active ? (isErasing = 1) : (isErasing = 0);
});

/* COLOR PICKER */
const colorPicker = document.getElementById("color-picker");
color = colorPicker.value;
colorPicker.addEventListener("input", () => {
  color = colorPicker.value;
});

/* INCREMENTAllY DARKEN */
const incrementalDarken = document.querySelector(".incremental-darken");
incrementalDarken.addEventListener("click", () => {
  this.active = !this.active;
  this.active ? (isIncrementalyDarkening = 1) : (isIncrementalyDarkening = 0);
});

function darkenIncrementally(e) {
  if (e.button == 0 && IncrementalyDarkening == 1) {
    console.log(e.target.style.backgroundColor);
    let squareDiv, colors;

    squareDiv = getComputedStyle(e.target).getPropertyValue("background-color");
    console.log(squareDiv);

    //Get values
    colors = squareDiv.split(", ");
    colors[0] = parseFloat(colors[0].split("(")[1]);
    colors[1] = parseFloat(colors[1]);
    colors[2] = parseFloat(colors[2]);

    //Correct missing alpha
    if (colors.length == 3) {
      colors[3] = 1;
    }
    //Apply new style
    colors[3] = parseFloat(colors[3]) - 0.1;
    colors = "rgba(" + colors.join(",") + ")";
    e.target.style.backgroundColor = colors;
  }
}
