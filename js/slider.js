// USE WITH slider.css
// JavaScript to update toggle state text
const toggle = document.getElementById("myToggle");
const stateText = document.getElementById("toggleValue");

toggle.addEventListener("change", function() {
  stateText.textContent = toggle.checked ? "ON" : "OFF";
  if (toggle.checked) {
    // Spustiť funkciu pre ON
    functionForOn();
    functionForOnDebug();
} else {
    // Spustiť funkciu pre OFF
    functionForOff();
    functionForOffDebug();
}
});
//Tu je debug example
function functionForOnDebug() {
  console.log("Funkcia pre ON bola spustená.");
  // Tu pridajte ďalší kód pre ON
}

function functionForOffDebug() {
  console.log("Funkcia pre OFF bola spustená.");
  // Tu pridajte ďalší kód pre OFF
}

// Resetovať na OFF pri načítaní stránky
toggle.checked = false;
stateText.textContent = "OFF";