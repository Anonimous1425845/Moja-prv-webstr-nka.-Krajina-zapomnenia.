function getHostname(){
    const host = (typeof window !== 'undefined') ? window.location.hostname : 'node-env';
    return host;
}

module.exports = () => getHostname()