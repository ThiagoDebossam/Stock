import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/Login'
import Dashboard from '../components/dashboard/Dashboard'
import ItemList from '../components/items/ItemList'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        component: Dashboard
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'dashboard',
        path: '/',
        component: Dashboard
    },
    {
        name: 'items',
        path: '/items',
        component: ItemList
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
