alert("Absolutley go check out Duklock's channel! https://www.youtube.com/@DuklockPlus");

document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('dusko-frame');
    if (!iframe) return;

    const videos = [
        'https://www.youtube.com/embed/2O9Lr87yoQQ?si=hUUTPYO-qgiSSJ1Y',
        'https://www.youtube.com/embed/cuKBu3xBn-Q?si=9yc7S-vf63QdmccG'
    ];

    const base = videos[Math.floor(Math.random() * videos.length)];
    const sep = base.includes('?') ? '&' : '?';
    iframe.src = base + sep + 'autoplay=1&mute=0&loop=1' + base.split('/').pop().split('?')[0];
});