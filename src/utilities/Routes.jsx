import Home from "../components/home/Home";
import Game from "../components/game/Game";
import Games from "../components/games/Games";

class Route {
    constructor({ label = "", path = "", component = "", isShown = false }) {
        this.label = label;
        this.path = path;
        this.component = component;
        this.isShown = isShown;
    }
}

const ROUTES = {
    home: new Route({
        id: 1,
        label: "Home",
        path: "/",
        component: Home,
        isShown: true
    }),
    games: new Route({
        id: 2,
        label: "Games",
        path: "/games",
        component: Games,
        isShown: true,
    }),
    game: new Route({
        id: 3,
        label: "Game",
        path: "/game",
        component: Game,
        isShown: true,
    })
}

export default ROUTES;