import AbstractView from "./AbstractView.mjs";
import CreateJsxElement from "../modules/CreateJsxElement.mjs";

export default class extends AbstractView {
    constructor() {
        super();
    }

    async render() {
        return (
            <div className="settings">
                <main className="main">
                    <h1>SETTINGS PAGE</h1>
                </main>
            </div>
        );
    }
}
