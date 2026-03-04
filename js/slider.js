// USE WITH slider.css
// Lightweight slider utility with simple API: createSlider(id, options)
// Options:
//   showStateText: boolean (default false) — show/hide ON/OFF text
//   enableDoubleClick: boolean (default true) — allow double-click on label to toggle text visibility
//   on: function — callback when toggled ON
//   off: function — callback when toggled OFF
// Example: createSlider('myToggle', { showStateText: true, enableDoubleClick: false, on: ()=>{}, off: ()=>{} })

function _makeSlider(toggleEl, options = {}){
  const container = toggleEl.closest('.toggle-container') || toggleEl.parentElement || document;
  const stateText = container.querySelector('.toggle-state');
  let showStateText = options.showStateText !== undefined ? options.showStateText : false;
  let enableDoubleClick = options.enableDoubleClick !== undefined ? options.enableDoubleClick : true;
  let onHandler = options.on || function(){};
  let offHandler = options.off || function(){};
  
  console.log('[slider] _makeSlider init:', { showStateText, enableDoubleClick, hasOnHandler: typeof onHandler, hasOffHandler: typeof offHandler });
  console.log('[slider] options.on:', options.on, 'options.off:', options.off);
  if(options.on) console.log('[slider] options.on is:', options.on.toString().substring(0, 80));

  function updateStateText(){
    if(!stateText) return;
    stateText.textContent = toggleEl.checked ? 'ON' : 'OFF';
    stateText.style.display = showStateText ? '' : 'none';
  }

  toggleEl.addEventListener('change', function(){
    console.log('[slider] change event fired, checked:', toggleEl.checked);
    if(toggleEl.checked){
      console.log('[slider] calling onHandler...');
      try { onHandler(toggleEl); } catch(e){ console.error('[slider] onHandler error:', e); }
    } else {
      console.log('[slider] calling offHandler...');
      try { offHandler(toggleEl); } catch(e){ console.error('[slider] offHandler error:', e); }
    }
    updateStateText();
  });

  // allow double-click on label to toggle state text visibility (if enabled)
  const label = container.querySelector('.toggle-label');
  if(label && enableDoubleClick){
    label.addEventListener('dblclick', function(){
      showStateText = !showStateText;
      updateStateText();
    });
  }

  // initialize
  if(toggleEl.checked === undefined) toggleEl.checked = false;
  updateStateText();

  return {
    toggle: toggleEl,
    stateText: stateText,
    updateStateText: updateStateText,
    setShowStateText(v){ showStateText = !!v; updateStateText(); },
    setEnableDoubleClick(v){ enableDoubleClick = !!v; },
    setOn(fn){ onHandler = fn; },
    setOff(fn){ offHandler = fn; }
  };
}

window.createSlider = function(idOrEl, options){
  const toggleEl = (typeof idOrEl === 'string') ? document.getElementById(idOrEl) : idOrEl;
  console.log('[slider] createSlider called with id:', idOrEl, 'element found:', !!toggleEl, 'options:', options);
  if(!toggleEl) return null;
  // Mark as initialized to prevent auto-init from running again
  toggleEl.__sliderInitialized = true;
  return _makeSlider(toggleEl, options);
};

// Auto-initialize all toggles on the page with default behavior
document.addEventListener('DOMContentLoaded', function(){
  const els = document.querySelectorAll('.toggle-input');
  els.forEach(function(el){
    // avoid double-init if already initialized via createSlider()
    if(el.__sliderInitialized) return;
    _makeSlider(el, { 
      showStateText: window.sliderShowStateText !== undefined ? window.sliderShowStateText : false,
      enableDoubleClick: false
    });
    el.__sliderInitialized = true;
  });
});