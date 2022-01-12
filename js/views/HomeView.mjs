import AbstractView from "./AbstractView.mjs";
import CreateJsxElement from "../modules/CreateJsxElement.mjs";

export default class extends AbstractView {
    constructor() {
        super();
    }

    async render() {
        return (
            <div className="home">
                <main className="main">
                    <h1>HOME PAGE</h1>
                </main>
            </div>
        )
    }
}
