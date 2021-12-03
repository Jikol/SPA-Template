export default class {
    constructor() {
        this.controller = new AbortController();
    }

    sleep(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
            this.controller.signal.addEventListener('abort', () => reject());
        });
    }

    stopSleep() {
        this.controller.abort();
    }
}