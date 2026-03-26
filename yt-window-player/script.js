let h;
let f;

// debug
const deb = false

function GO(trpo,ff) {
    const urlo = document.getElementById(trpo);
    if(!urlo.value){
        if(h === 1){
            f = 'enter link here!'
            h = 0;
            if(deb === true){
                console.log('1');
            }
        } else {
            f = ff
            h = 1;
            if(deb === true){
                console.log('0');
            }
        }
        urlo.placeholder = f;
    } else {
        const goto = './play/?v=' + urlo.value;
        window.location.href = goto;
    }
}