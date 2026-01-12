alert("Absolutley go check out Duklock's channel! https://www.youtube.com/@DuklockPlus");

document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('dusko-frame');
    if (!iframe) return;

    const videos = [
        'https://www.youtube.com/embed/2O9Lr87yoQQ?si=hUUTPYO-qgiSSJ1Y',
        'https://www.youtube.com/embed/cuKBu3xBn-Q?si=9yc7S-vf63QdmccG',
        'https://www.youtube.com/embed/sI0Y70REcZw?si=QqfV671Ddr7A6Ed4',
        'https://www.youtube.com/embed/5g6scBWx350?si=xqEwPv7-U_zdN0cO',
        'https://www.youtube.com/embed/56t6mnNqn48?si=wB_9fxaYRfX-l5Ur',
        'https://www.youtube.com/embed/uEEilt5yRYA?si=mGYSui4xwO5P0hrE',
        'https://www.youtube.com/embed/Q71WGfFdNJk?si=wQsveT9GggC0JWb1',
        'https://www.youtube.com/embed/esJGfUJeH0I?si=NQPS2xs61ClMKCPl',
        'https://www.youtube.com/embed/LniUdvuh-3s?si=ntDXxwylpo05P36l',
        'https://www.youtube.com/embed/mtIrVtFdVbs?si=x1g4PgEqbF-pmQ7L'
    ];

    const base = videos[Math.floor(Math.random() * videos.length)];
    const sep = base.includes('?') ? '&' : '?';
    iframe.src = base + sep + 'autoplay=1&mute=0&loop=1' + base.split('/').pop().split('?')[0];
});

window.addEventListener('load', () => {
    showMessage("🐧");
});