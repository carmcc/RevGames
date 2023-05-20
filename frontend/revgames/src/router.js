import SignUp from "@/components/SignUp.vue";
import Home from "@/components/Home.vue";
import SignIn from "@/components/SignIn.vue";
import Logout from "@/components/Logout.vue";
import ErrorPage from "@/components/ErrorPage.vue";
import About from "@/components/About.vue";
import AddGame from "@/components/AddGame.vue";
import GameReview from "@/components/GameReview.vue";
import AddReview from "@/components/AddReview.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from './store.js';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "SignUp",
            component: SignUp,
            path: "/signup",
            props: false,
            meta: {
                hideNavbar: false,
                isAuthRequired: false,
            },
        },
        {
            name: "Home",
            component: Home,
            path: "/",
            props: false,
            meta: {
                hideNavbar: false,
                isAuthRequired: false,
            },
        },
        {
            name: "SignIn",
            component: SignIn,
            path: "/signin",
            props: false,
            meta: {
                hideNavbar: false,
                isAuthRequired: false,
            },
        },
        {
            name: "Logout",
            component: Logout,
            path: "/logout",
            props: false,
            meta: {
                hideNavbar: false,
                isAuthRequired: true,
            },
        },
        {
            name: "About",
            component: About,
            path: "/about",
            props: false,
            meta: {
                hideNavbar: false,
                isAuthRequired: false,
            },
        },
        {
            name: "AddGame",
            component: AddGame,
            path: "/addGame",
            props: false,
            meta: {
                hideNavbar: false,
                isAuthRequired: true,
            },
        },
        {
            name: "GameReview",
            component: GameReview,
            path: "/gameReview/:receivedGameId",
            props: true,
            meta: {
                hideNavbar: false,
                isAuthRequired: false,
            },
        },
        {
            name: "ErrorPage",
            component: ErrorPage,
            path: "/:catchAll(.*)", // Definizione della rotta per la pagina di errore 404
            props: false,
            meta: {
                hideNavbar: true,
                isAuthRequired: false,

            },
        },
        {
            name: "AddReview",
            component: AddReview,
            path: "/addReview/:idGame",
            props: true,
            meta: {
                hideNavbar: false,
                isAuthRequired: true,
            },
        },

    ]
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.isAuthRequired) {
        try{
            await store.dispatch("checkLoginWithAuthentication");
            next();
        }catch (e) {
            store.commit("setLogged", false);
            store.commit("setAdministrator", false)
            next("/signin");
        }
    } else {
        let user = localStorage.getItem("username");
        if(user) {
            await store.dispatch("checkLoginWithAuthentication");
        }
        else {
            store.commit("setLogged", false);
            store.commit("setAdministrator", false)
        }
        next();
    }
});


export default router;