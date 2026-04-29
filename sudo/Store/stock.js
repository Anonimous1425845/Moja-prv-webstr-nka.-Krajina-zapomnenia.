if (!navigator.userAgent.toLowerCase().includes("firefox")) {
    alert("Táto stránka je stavaná na Firefoxe. Za bugy na iných prehliadačoch neručím!!!");
}

const stockEL = document.getElementById('stock');

// Getting Data 
async function FINE() {
    const dataraw = await fetch("simulated.json");
    const data = await dataraw.json();
    console.log(dataraw);
    console.log(data);
    data.data.forEach( data => {
        const cont = document.createElement('div');
        cont.className = 'item';
        cont.innerHTML = `
            <div class="imageCont"><img src="${data.imageUrl}" alt=""></div>
            <div class="textCont"><span>${data.textContent}</span></div>
        `;
        stockEL.appendChild(cont);
    });
}
FINE();