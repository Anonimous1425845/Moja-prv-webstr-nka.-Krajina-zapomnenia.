function FINE(were,code) {
    let go;
    if (were === 'cat') {
        go = 'https://http.cat/status/' + code;
    }
    if (were === 'dog') {
        go = 'https://http.dog/' + code;
    }
    if (!go) {return}
    window.location.href = go;
}