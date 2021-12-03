import Prototypes from "../modules/Prototypes.mjs";
import IndexView from "../views/IndexView.mjs";
import Animation from "../modules/Animation.mjs";

class Router {
    constructor(...params) {
        if (Router._instance) {
            return Router._instance;
        }

        Router._instance = this;
        window.addEventListener("popstate", this.#router);

        this.#bindListeners();
        this.#router();
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.#router();
    }

    async #router() {
        const routes = [
            { path: "/", title: "Index", node: "index", view: IndexView }
        ];

        const matches = routes.map(route => {
            return {
                route: route,
                isMatch: location.pathname === route.path
            }
        });

        let match = matches.find(potentialMatch => potentialMatch.isMatch);

        if (!match) {
            match = {
                route: routes[0],
                isMatch: true
            }
        }

        const view = new match.route.view();
        document.title = match.route.title;

        const appContainer = document.querySelector('#app');
        let originalInnerHTML = appContainer.innerHTML;

        appContainer.prepend(document.createElementFromString(await view.render()));
        view.bindListeners(match.route.node);
        const oldNode = appContainer.lastChild;

        if (originalInnerHTML) {
            Animation.fadeOut(oldNode).then(() => {
                oldNode.remove();
            })
        }
    }

    #bindListeners() {
        document.body.addEventListener("click", e => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                this.navigateTo(e.target.getAttribute('data-route'));
            }
        });
    }
}

export default Router;