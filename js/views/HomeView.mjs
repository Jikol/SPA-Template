import AbstractView from "./AbstractView.mjs";

export default class extends AbstractView {
    constructor() {
        super();
    }

    async render() {
        // language=HTML
        return `
            <div class="home">
                <main class="main">
                    <h1>HOME PAGE</h1>        
                </main>
	        </div>
        `;
    }
}
