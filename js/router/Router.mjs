import HomeView from "../views/HomeView.mjs";
import SettingsView from "../views/SettingsView.mjs";
import Animation from "../modules/Animation.mjs";

class Router {
    constructor(...params) {
        if (Router._instance) {
            return Router._instance;
        }
        Router._instance = this;

        this.#bindListeners();
        this.#router();
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.#router();
    }

    async #router() {
        const routes = [
            { path: "/", title: "Home", node: "home", view: HomeView },
            { path: "/settings", title: "Settings", node: "settings", view: SettingsView }
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

        appContainer.insertAdjacentHTML("afterbegin", await view.render());
        view.bindListeners(match.route.node);
        const oldNode = appContainer.lastElementChild;

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
                if (e.target.getAttribute('data-disabled') === null) {
                    const selectedNodes = document.querySelectorAll('[data-selected]');
                    selectedNodes.forEach(selectedNode => {
                        selectedNode.removeAttribute('data-selected');
                    });
                    e.target.setAttribute('data-selected', '');
                    this.navigateTo(e.target.href);
                }
            }
        });
    }
}

export default Router;