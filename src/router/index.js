import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
        path: '/cdi',
        name: 'home',
        component: HomeView
    },
    {
        path: '/ayuda',
        name: 'ayuda',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AyudaView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.VUE_APP_BASE_URL),
    routes
})

export default router