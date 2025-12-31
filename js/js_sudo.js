alert("javaScript Yay!");

function changeText() {
    const sys = ["You clicked the button!", "Hello World!", "JavaScript is hard!", "<a class=\"link\" href=\"https://www.youtube.com/watch?v=wJnBTPUQS5A\">nostalgia</a>"];
    document.getElementById("message").innerHTML = sys[Math.floor(Math.random() * sys.length)];
}

function changeColor() {
    colors = ["red", "blue", "green", "yellow", "purple", "aqua"];
    document.getElementById("box").style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

document.getElementById("myButton").addEventListener("mouseover", () => sendAlert(true));

function sendAlert(n) {
    if (n == true) {
        alert("You hovered me!");
        n = false;
    } else {
        alert("This is an alert!");
    }
}