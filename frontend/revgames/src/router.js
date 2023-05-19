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
import instance from '@/axios.js';


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
            name: "GameReviewForLoggedUsers",
            component: GameReview,
            path: "/gameReview/:receivedGameId/:receivedUserId",
            props: true,
            meta: {
                hideNavbar: false,
                isAuthRequired: true,
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
            path: "/addReview/:idUser/:idGame",
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
        // store.dispatch("checkLogin");
        try{
            await instance.get("/api/protected");
            store.commit("setLogged", true);
            next();
        }catch (e) {
            store.commit("setLogged", false);
            next("/signin");
        }
    } else {
        let user = localStorage.getItem("username");
        if(user)
            store.commit("setLogged", true);
        else
            store.commit("setLogged", false);
        next();
    }
});


export default router;