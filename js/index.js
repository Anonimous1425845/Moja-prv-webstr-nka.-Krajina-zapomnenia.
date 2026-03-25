dopopups = false

// allways on popup
if (!navigator.userAgent.toLowerCase().includes("firefox")) {
    alert("Táto stránka je stavaná na Firefox. Za bugy neručím!!!");
}

if(dopopups === true){
    alert("PF2026")
    alert("Toto je testvacia a zaroveň prvá stránka.")
    alert("Môže obsahovať copyright")
    alert("Použiť iba na nekomerčné použiťie")
}

function redirrect(url) {
    window.location.href = url
}

redirrect("home.html")