// USE WITH slider.css
// JavaScript to update toggle state text
const toggle = document.getElementById("myToggle");
const stateText = document.getElementById("toggleValue");

// If user wants to show/hide the ON/OFF text dynamically
// You need to specify this in the code!!!
// let sliderShowStateText = true or false;

function updateStateText() {
  if (!stateText) return;
  stateText.textContent = toggle.checked ? "ON" : "OFF";
  stateText.style.display = sliderShowStateText ? "" : "none";
}

toggle.addEventListener("change", function() {
  // keep calling the ON/OFF handlers
  if (toggle.checked) {
    // Spustiť funkciu pre ON
    functionForOn && functionForOn();
    functionForOnDebug && functionForOnDebug();
  } else {
    // Spustiť funkciu pre OFF
    functionForOff && functionForOff();
    functionForOffDebug && functionForOffDebug();
  }
  updateStateText();
});

// Double-click the visible label to toggle showing the ON/OFF text
const label = document.querySelector('.toggle-label');
if (label) {
  label.addEventListener('dblclick', function() {
    showStateText = !showStateText;
    updateStateText();
  });
}

// Tu je debug example
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
// Specify this after config to update the slider after load!!!
// updateStateText();