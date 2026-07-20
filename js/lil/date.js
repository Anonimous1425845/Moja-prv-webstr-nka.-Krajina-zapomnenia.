// Small date formater
function formatedDate(){
    const now = new Date();

    const miliseconds = now.getMilliseconds();
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const ô = '.';
    const ň = ':';

    const formated = day + ô + month + ô + year + ' | ' + hours + ň + minutes + ň + seconds + ň + miliseconds;

    return formated;
}

// This check prevents browsers from crashing on the 'module' keyword
if (typeof module !== 'undefined' && module.exports) {
    module.exports = () => formatedDate();
}

export { formatedDate };