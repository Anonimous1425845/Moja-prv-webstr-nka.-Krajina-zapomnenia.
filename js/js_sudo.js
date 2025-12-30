alert("javaScript Yay!");

function changeText() {
    const sys = ["You clicked the button!", "Hello World!", "JavaScript is hard!", "<a class=\"link\" href=\"https://www.youtube.com/watch?v=wJnBTPUQS5A\">nostalgia</a>"];
    document.getElementById("message").innerHTML = sys[Math.floor(Math.random() * sys.length)];
}

function changeColor() {
    colors = ["red", "blue", "green", "yellow", "purple", "aqua"];
    document.getElementById("box").style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

function sendAlert() {
    alert("This is an alert!");
}

document.getElementById("myButton").addEventListener("mouseover", sendAlert());