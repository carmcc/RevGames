import SignUp  from "@/components/SignUp.vue";
import Home from "@/components/Home.vue";
import SignIn from "@/components/SignIn.vue";
import Logout from "@/components/Logout.vue";
import ErrorPage from "@/components/ErrorPage.vue";
import About from "@/components/About.vue";
import AddGame from "@/components/AddGame.vue";
import GameReview from "@/components/GameReview.vue";
import { createRouter, createWebHistory } from "vue-router";

const allowedRoutes = ["", "signup", "signin", "logout", "error", "about", "addGame", `gameReview`];

const routes = [
    {
        name: "SignUp",
        component: SignUp,
        path: "/signup",
        props: false,
        meta: {
            hideNavbar: false
        }
    },
    {
        name: "Home",
        component: Home,
        path: "/",
        props: false,
        meta: {
            hideNavbar: false
        }
    },
    {
        name: "SignIn",
        component: SignIn,
        path: "/signin",
        props: false,
        meta: {
            hideNavbar: false
        }
    },
    {
        name: "Logout",
        component: Logout,
        path: "/logout",
        props: false,
        meta: {
            hideNavbar: false
        }
    },
    {
        name: "ErrorPage",
        component: ErrorPage,
        path: "/error",
        props: false,
        meta: {
            hideNavbar: true
        }
    },
    {
        name: "About",
        component: About,
        path: "/about",
        props: false,
        meta: {
            hideNavbar: false
        }
    },
    {
        name: "AddGame",
        component: AddGame,
        path: "/addGame",
        props: false,
        meta: {
            hideNavbar: false
        }
    },
    {
        name: "GameReview",
        component: GameReview,
        path: `/gameReview/:receivedGameId`,
        props: true,
        meta: {
            hideNavbar: false
        }
    },
    // {
    //     name: "GameReviewForSingleUser",
    //     component: GameReview,
    //     path: `/gameReview/:receivedGameId/:receivedUserId`,     //TODO da implementare
    //     props: true,
    //     meta: {
    //         hideNavbar: false
    //     }
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    let path = to.path.split("/")[1];       //TODO discutere dell'implementazione
    if (allowedRoutes.includes(path))
        next();
    else
        next({ name: "ErrorPage" });
});

export default router;