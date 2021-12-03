export default class {
    constructor(...params) {}

    static onMousePress(target, callback) {
        target.addEventListener("mousedown", e => {
           this.interval = setInterval(() => {
               callback(e);
           }, 150);
        });
        target.addEventListener("mouseup", () => {
           clearInterval(this.interval);
        });
        target.addEventListener("click", e => {
           callback(e);
        });
    }

    static onKeyPress(target, callback) {
        target.addEventListener("keydown", e => {
            this.interval = setInterval(() => {
                callback(e);
            }, 150);
        });
        target.addEventListener("keyup", () => {
            clearInterval(this.interval);
        });
        target.addEventListener("keypress", e => {
            callback(e);
        });
    }
}