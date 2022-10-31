import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    {
        path: '/',
        component: () => import('../views/HelloWorld')
    },
    {
        path: '/login',
        component: () => import('../views/AdminLogin')
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;
