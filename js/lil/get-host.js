function getHostname(){
    const host = (typeof window !== 'undefined') ? window.location.hostname : 'node-env';
    return host
}

// node.js export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = () => getHostname();
}
// module export
export { getHostname };