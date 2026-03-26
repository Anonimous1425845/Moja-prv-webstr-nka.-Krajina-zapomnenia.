const player = document.getElementById('player');
const were = new URLSearchParams(window.location.search).get('v');
const sep = were.includes('?') ? '&' : '?';
player.src = were + sep + 'autoplay=1&mute=0&loop=1' + were.split('/').pop().split('?')[0];