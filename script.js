for (let i = 0; i < 256; i++) {
    const div = document.createElement('div');
    div.classList.add('box');
    document.querySelector('.container').appendChild(div);
}

document.getElementById('resize').addEventListener('click', function resizeGrid() {
    while (true) {
        let newSize = prompt("Enter new grid size (max. 100): " );
        
        if (newSize === null) {
            return;
        }

        if (newSize > 100) {
            alert ("Size too large! Please enter a number less <= 100.");
            continue;
        } else {
            const container = document.querySelector('.container');
            container.textContent = '';
            const containerSize = 480;
            const boxSize = containerSize / newSize;
            const totalBox = newSize * newSize;
            
            for (let i = 0; i < totalBox; i++) {
                const div = document.createElement('div');
                div.classList.add('box');
                div.style.width = `${boxSize}px`;
                div.style.height = `${boxSize}px`;
                container.appendChild(div);
            }
            break;
        }
    }
});