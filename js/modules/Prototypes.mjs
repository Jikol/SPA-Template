export default

Document.prototype.createElementFromString = (str) => {
    const element = new DOMParser().parseFromString(str, 'text/html');
    return element.documentElement.querySelector('body').firstChild;
};
