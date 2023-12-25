import {createRouter,createWebHistory} from 'vue-router'
import Home from '@/components/Home.vue'
import Diff from '@/components/Diff.vue'
import Snake from '@/components/snake/Snake.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: '/home',
            component: Home,
        },
        {
            path: '/diff',
            component: Diff,
        },
        {
            path: '/snake',
            component: Snake,
        }
    ]
})

export default router