async function Send(toid,who) {
    let succes;
    const data = document.getElementById(toid).value;
    const key = document.getElementById('key').value;
    try {
        const response = await fetch(`http://${window.location.hostname}:3003/insert?t=todoeli&colums=todo&values=${encodeURIComponent(data)}`, {
            headers: {
                'pass': key
            }
        });
        succes = true;
    } catch (err) {
        succes = err;
    } finally {
        if (succes === true) {
            alert('Úspešne poslané');
        } else {
            alert('Chiba' + succes)
        }
    }
}