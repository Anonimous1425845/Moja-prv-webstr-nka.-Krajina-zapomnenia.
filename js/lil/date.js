// Small date formater
function formatedDate(){
    const now = new Date();

    const miliseconds = now.getMilliseconds();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const ô = ' '
    const ň = ':'

    const formated = day + ô + month + ô + year + ' | ' + hours + ň + minutes + ň + seconds + ň + miliseconds

    return formated
}

module.exports = () => formatedDate();