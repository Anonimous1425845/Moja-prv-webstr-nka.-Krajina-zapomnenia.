const inputEL = document.getElementById('input1');
const outEL = document.getElementById('list');
let counter = 0;

function FINE() {
    counter = counter + 1;
    const data = `<p>${counter}: ${inputEL.value}</p>`;
    
    outEL.insertAdjacentHTML('beforeend', data);
}

addEventListener('keydown', (udalost) => {
    if (udalost.key === 'Enter') {
        FINE();
    }
});