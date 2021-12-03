export default class {
    constructor(message) {
        this.payload = JSON.parse(message.payloadString);
        this.payload = this.payload.msg;
        if (message.destinationName) {
            this.onMessage();
        }
        console.info(`RECEIVED ${message.payloadString} FROM ${message.destinationName}`);
    }

    onMessage() {
        console.dir(this.payload);
    }
}