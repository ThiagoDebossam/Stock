import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/Login'
import Dashboard from '../components/dashboard/Dashboard'
import ItemList from '../components/items/ItemList'
import ProductsList from '../components/products/ProductsList'
import UserList from '../components/users/UserList'

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
    },
    {
        name: 'products',
        path: '/products',
        component: ProductsList
    },
    {
        name: 'users',
        path: '/users',
        component: UserList
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
