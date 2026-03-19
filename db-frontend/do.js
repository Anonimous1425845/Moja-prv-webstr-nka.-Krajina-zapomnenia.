async function Get(){
    const GOTOHOST = getHostname();
    try{
        const thejson = await fetch(`http://${GOTOHOST}:3003/select?t=text`);

        const data = await thejson.json();

        // Pre každý objekt vytvoríme sekciu
        data.data.forEach(item => {
            const block = document.createElement("div");
            
            block.style.border = "1px solid #2e2e2e";
            block.style.padding = "8px";
            block.style.margin = "2px";
            block.style.borderRadius = "2vh";
            block.style.background = "#383838";

            block.innerHTML = `
                <h3>ID: ${item.id}</h3>
                <p>${item.data}</p>
            `;

            document.getElementById('show').appendChild(block);
        });

        const render = data.data.map(item => item.id);
        console.log('What IDs are valid: ',render);

        //const render = [
        //    1,
        //    2
        //]
        const random = render[Math.floor(Math.random() * render.length)];

        // nájdeme objekt, ktorého id sa rovná random
        const vybrano = data.data.find(item => item.id === random);

        if (vybrano) {
            document.getElementById('random').textContent = vybrano.data;
        } else {
            console.error('Err at selecting the text');            
        }

        // document.getElementById('show').innerText = JSON.stringify(data, null, 2);
    }catch(err){
        console.error('Blast Processing Falied!');
        console.warn('PLEASE Tell me i am stupid!');
    }
}