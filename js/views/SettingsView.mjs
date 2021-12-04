import AbstractView from "./AbstractView.mjs";

export default class extends AbstractView {
    constructor() {
        super();
    }

    async render() {
        // language=HTML
        return `
            <div class="settings">
                <main class="main">
                    <h1>SETTINGS PAGE</h1>
                </main>
            </div>
        `;
    }
}
