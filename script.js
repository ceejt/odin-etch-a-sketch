const container = document.querySelector('.container'); 
const squareDiv = {}; 

// Create grid at the start
for (let i = 0; i < 256; i++) {
    const div = document.createElement('div');
    div.classList.add('box');
    container.appendChild(div);
}
paintGrid();

// grid size text output
let gridSlider = document.getElementById("myRange");
let output = document.getElementById("grid-size");
output.textContent = gridSlider.value;

gridSlider.oninput = function () {
  output.textContent = this.value;
  drawGrid(this.value);
  paintGrid();
};

// resize grid
function drawGrid(numOfSquareDivs) {
  const squareDivToRemove = document.querySelectorAll(".box");
  squareDivToRemove.forEach((div) => {
    container.removeChild(div);
  });

  if (numOfSquareDivs <= 100) {
    const totalSquares = numOfSquareDivs * numOfSquareDivs;
    for (let i = 0; i < totalSquares; i++) {
      const div = document.createElement("div");
      div.classList.add("box");
      div.style.width = `${480 / numOfSquareDivs}px`;
      div.style.height = `${480 / numOfSquareDivs}px`;
      container.appendChild(div);
    }
  }
}

//random color and darken function
function paintGrid() {
  const boxes = document.querySelectorAll('.box');
  
  boxes.forEach(box => {
    box.dataset.interactions = '0';
    
    box.addEventListener('mouseenter', function() {
      // Random color & darkening effect
      const interactions = parseInt(this.dataset.interactions);
      
      if (interactions === 0) {
        // First hover: random color
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        
        this.dataset.originalR = r;
        this.dataset.originalG = g;
        this.dataset.originalB = b;
        this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }
      
      if (interactions < 10) {
        // Progressive darkening
        const factor = Math.pow(0.9, interactions + 1);
        const newR = Math.floor(this.dataset.originalR * factor);
        const newG = Math.floor(this.dataset.originalG * factor);
        const newB = Math.floor(this.dataset.originalB * factor);
        
        this.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
        this.dataset.interactions = interactions + 1;
      }
    });
    
    // Add click/drag events
    box.addEventListener('mousedown', () => isDrawing = true);
    box.addEventListener('mouseup', () => isDrawing = false);
    // ... more event listeners
  });
}

//title style
const title = document.querySelector('h1');
const text = title.textContent;
title.innerHTML = '';


for (let i = 0; i < text.length; i++) {
  if (text[i] === ' ') {
    title.innerHTML += ' ';
  } else {
    title.innerHTML += `<span class="letter">${text[i]}</span>`;
  }
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