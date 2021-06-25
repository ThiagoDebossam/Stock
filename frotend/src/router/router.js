import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/Login'
import Dashboard from '../components/dashboard/Dashboard'

Vue.use(VueRouter)

const routes = [
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'dashboard',
        path: '/',
        component: Dashboard
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
