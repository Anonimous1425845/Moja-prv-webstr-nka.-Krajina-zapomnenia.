const player = document.getElementById('player');
const were = new URLSearchParams(window.location.search).get('v');
const sep = were.includes('?') ? '&' : '?';
const isembed = new URLSearchParams(window.location.search).get('em');
// Funguje aj bolean i string
if(isembed === true || isembed === 'true'){
    player.src = were + sep + 'autoplay=1&mute=0&loop=1' + were.split('/').pop().split('?')[0];
} else {
    player.src = were + sep + were.split('/').pop().split('?')[0];
}