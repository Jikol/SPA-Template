import MQTT from "paho-mqtt"
import MessageHandler from "./MessageHandler.mjs";

export default class {
    constructor(broker, port, subscribe, username, password) {
        this.client = new MQTT.Client(broker, port, "/ws", `client-${this.#getHex(4)}`);
        this.client.onConnectionLost = (responseObject) => {
            console.warn(`%cCONNECTION LOST ${responseObject.errorMessage}`,
                "color: white; font-size: 1.5em; background: teal");
        };
        this.client.onMessageDelivered = (message) => {
            console.info(`%cSENDED ${message.payloadString} TO ${message.destinationName}`,
                "color: black; font-size: 1.15em; font-weight: bolder; background: aqua; border-radius: 5px; padding: 0 0.5vmin");
        };
        this.client.onMessageArrived = (message) => {
            new MessageHandler(message);
        };
        this.subscribe = subscribe;
        this.#setCreddentials(username, password);
        this.#setOptions();
        this.#connect();
    }

    #setCreddentials(username, password) {
        this.username = username;
        this.password = password;
    }

    sendMessage(data, destination) {
        if (typeof data === 'object' && data !== null) {
            data = JSON.stringify(data);
        }
        try {
            const message = new MQTT.Message(data);
            message.destinationName = destination;
            this.client.send(message);
        } catch(e) {
            throw new Error(e);
        }
    }

    #connect() {
        if (location.protocol === "https:") {
            this.options.useSSL = false;
        }
        this.client.connect(this.options);
    }

    #setOptions() {
        this.options = {
            timeout: 30,
            keepAliveInterval: 30,
            userName: this.username,
            password: this.password,
            onSuccess: () => {
                this.subscribe.forEach((item) => {
                    this.client.subscribe((`${item}.#`), { qos: 1 });
                });
                console.info("%cRABBIT CONNECTION SUCCESS",
                    "color: black; font-size: 1.15em; background: yellowgreen; border-radius: 5px; font-weight: bolder; padding: 0 0.5vmin;");
            },
            onFailure: (message) => {
                console.warn(`RABBIT CONNECTION FAILURE ${message.errorMessage}`);
            }
        }
    }

    #getHex(length) {
        let hex = '0'.repeat(length) + Math.floor((Math.random() * 16 ** length)).toString(16);
        return hex.slice(-length);
    }
}