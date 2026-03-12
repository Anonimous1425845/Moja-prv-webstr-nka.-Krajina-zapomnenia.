async function Go() {
    try{
        const response = await fetch('http://192.168.0.110:2999/');
        const data = await response.json();
        const status = data.running;
        const txt = document.getElementById('txt');
        let to;
        if(status === true){
            to = 'Running';
        }else{
            to = 'Not Running';
        }
        txt.innerText = to;
    } catch (error) {
        document.getElementById('txt').innerText = 'Error';
    }
}
Go();