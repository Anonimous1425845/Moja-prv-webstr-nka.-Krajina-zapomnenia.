let h = 0;

// debug
const deb = true

function GO(trpo,defaulte,isembed) {
    const urlo = document.getElementById(trpo);
    if(!urlo.value){
        if(h === 0){
            urlo.placeholder = 'enter link here!';
            h = 1;
            if(deb === true){
                console.log('1');
            }
        } else {
            urlo.placeholder = defaulte;
            h = 0;
            if(deb === true){
                console.log('0');
            }
        }
    } else {
        let goto = './play/?';
        if(isembed === true || isembed === 'true'){
            goto = goto + 'em=is&'
        }
        goto = goto + 'v=' + encodeURIComponent(urlo.value);
        window.location.href = goto;
    }
}