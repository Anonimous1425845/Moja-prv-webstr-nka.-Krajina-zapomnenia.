alert("Absolutley go check out Duklock's channel! https://www.youtube.com/@DuklockPlus");

const iframe = document.getElementById('dusko-frame');

async function getLinks() {
    try {
        // RAW
        const response = await fetch('./js/sources/duklock.links.txt');
        const text = await response.text();

        // Rozdelenie textu podla riadku
        // .filter odstráni prípadne prázdne riadky
        // Predíde NULL
        const videos = text
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line.length > 0);

        // neh mu neni menene
        Object.freeze(videos);

        // Mas videjka =)
        return videos;
    } catch (error) {
        console.error("Videjka zdochli =( ERR: ",error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    RUN();
});

async function RUN() {
    if (!iframe) return;

    const videos = await getLinks();
    console.log(videos);

    const base = videos[Math.floor(Math.random() * videos.length)];
    const sep = base.includes('?') ? '&' : '?';
    const tosrc = base + sep + 'autoplay=1&mute=0&loop=1' + base.split('/').pop().split('?')[0];
    iframe.src = tosrc;
    console.log("Chosen: ",tosrc);
}

window.addEventListener('load', () => {
    msg("🐧");
});

function Custom(embed){
    const sep = embed.includes('?') ? '&' : '?';
    iframe.src = embed + sep + 'autoplay=1&mute=0&loop=1' + embed.split('/').pop().split('?')[0];
}
function Reroll() {
    RUN();
}
function Return() {
    window.location.href = './index.html';
}