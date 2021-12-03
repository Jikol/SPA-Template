import AbstractView from "./AbstractView.mjs";

export default class extends AbstractView {
    constructor() {
        super();
    }

    async render() {
        // language=HTML
        return `
            <div class="index">
		<h1>PAGE LOADED</h1>
	    </div>	
        `;
    }
}
