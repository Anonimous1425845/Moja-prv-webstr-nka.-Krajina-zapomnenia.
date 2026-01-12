function showMessage(text) {
    const box = document.createElement("div");
    box.className = "msg";
    box.textContent = text;

    document.body.appendChild(box);

    // fade-in (ak chceš)
    setTimeout(() => {
        box.style.opacity = "1";
    }, 100);

    // fade-out + odstránenie
    setTimeout(() => {
        box.style.opacity = "0";
        setTimeout(() => box.remove(), 300);
    }, 3000);
}
