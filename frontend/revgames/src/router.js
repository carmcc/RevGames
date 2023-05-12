import SignUp  from "@/components/SignUp.vue";
import Home from "@/components/Home.vue";
import SignIn from "@/components/SignIn.vue";
import Logout from "@/components/Logout.vue";
import ErrorPage from "@/components/ErrorPage.vue";
import About from "@/components/About.vue";
import AddGame from "@/components/AddGame.vue";
import { createRouter, createWebHistory } from "vue-router";

const allowedRoutes = ["/", "/signup", "/signin", "/logout", "/error", "/about", "/addGame"];

const routes = [
    {
        name: "SignUp",
        component: SignUp,
        path: "/signup",
        meta: {
            hideNavbar: false
        }
    },
    {
        name: "Home",
        component: Home,
        path: "/",
        meta: {
            hideNavbar: false
        }
    },
    {
        name: "SignIn",
        component: SignIn,
        path: "/signin",
        meta: {
            hideNavbar: false
        }
    },
    {
        name: "Logout",
        component: Logout,
        path: "/logout",
        meta: {
            hideNavbar: false
        }
    },
    {
        name: "ErrorPage",
        component: ErrorPage,
        path: "/error",
        meta: {
            hideNavbar: true
        }
    },
    {
        name: "About",
        component: About,
        path: "/about",
        meta: {
            hideNavbar: false
        }
    },
    {
        name: "AddGame",
        component: AddGame,
        path: "/addGame",
        meta: {
            hideNavbar: false
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (allowedRoutes.includes(to.path)) {
        next();
    } else {
        next({ name: "ErrorPage" });
    }
});

export default router;