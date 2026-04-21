if (!navigator.userAgent.toLowerCase().includes("firefox")) {
    alert("Táto minihra je stavaná na Firefoxe. Za bugy na iných prehliadačoch neručím!!!");
}

const debuglogs = new URLSearchParams(window.location.search).has('debug');
if(debuglogs){
    console.log('debug active!');
}
const textwindow = document.getElementById('text');

textwindow.innerHTML = `
    <p>Three doors in front of you</p>
    <p>Behind one of them is a ghost</p>
    <p>Which one will you open?</p>
`;

const doors = document.getElementById('doors');
const scorewind = document.getElementById('score');

// non moveable properties for function
let notcatched = true;
let score = 0;

function door(numero){

    // choses one door to infect.
    const ghost = Math.floor(Math.random() * 3) + 1;
    if(debuglogs){
        console.log(`ghost is in: ${ghost} door`);
        console.log(`you chose: ${numero}`);
    }

    if(numero){
        if (notcatched){
            textwindow.innerHTML = '';
            if(Number(numero) == Number(ghost)){
                notcatched = false;
                textwindow.innerHTML = `
                    <p>You hot couhgt by ghost</p>
                    <h1>RUN</h1>
                `;
            } else {
                textwindow.innerHTML = `
                    <p>You got to the next room!</p>
                    <p>and again there are three doors</p>
                    <p>which one will you open</p>
                `;
                score = score + 1
                scorewind.innerText = score;
            }
            console.log(`score is now: ${score}`);
        } else {
            alert('you are already catched please reload the webpage');
        }
    }
}