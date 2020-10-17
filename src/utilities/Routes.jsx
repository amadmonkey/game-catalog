import Home from "../components/home/Home";
import Game from "../components/game/Game";
import Games from "../components/games/Games";
import Articles from "../components/articles/Articles";
import Reviews from "../components/reviews/Reviews";
import MenuListPage from "../components/menu-list-page/MenuListPage";

class Route {
    constructor({ label = "", path = "", component = "", exact = true, isShown = false }) {
        this.label = label;
        this.path = path;
        this.component = component;
        this.exact = exact;
        this.isShown = isShown;
    }
}

const ROUTES = {
    home: new Route({
        label: "Home",
        path: "/",
        component: Home,
        exact: true,
        isShown: true
    }),
    games: new Route({
        label: "Games",
        path: "/games",
        component: Games,
        exact: true,
        isShown: true,
    }),
    game: new Route({
        label: "Game",
        path: "/games/:title/:id",
        component: Game,
        exact: true,
        isShown: true,
    }),
    articles: new Route({
        label: "Articles",
        path: "/articles",
        component: Articles,
        exact: false,
        isShown: true,
    }),
    reviews: new Route({
        label: "Reviews",
        path: "/reviews",
        component: Reviews,
        exact: false,
        isShown: true,
    }),
    menuList: new Route({
        label: "Menu List",
        path: "/menu-list/:type",
        component: MenuListPage,
        exact: false,
        isShown: true,
    })
}

export default ROUTES;