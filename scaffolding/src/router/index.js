import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Navbar from '../views/Navbar.vue'
import Infinite from '../views/Infinite.vue'
import Article from '../views/Article.vue'
import Register from '../views/Register.vue'
import Login from '../views/login.vue'

import Header from '../testing/Header.vue'
import Button from '../testing/Button.vue'
import Field from '../testing/Field.vue'
import access1 from '../testing/access1.vue'
import access2 from '../testing/access2.vue'
import Ajax from '../testing/Ajax.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'/ajax',
    component:Ajax
  },
  {
    path:'/access1',
    component:access1
  },
  {
    path:'/access2',
    component:access2
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/register',
    component:Register
  },

  {
    path:'/article/:id',
    component:Article
  },
  {
    path:'/infinite',
    component:Infinite

  },
  {
    path:'/header',
    component:Header
  },
  {
    path:'/button',
    component:Button
  },
  {
    path:'/field',
    component:Field
  },
  {
    path:'/navbar',
    component:Navbar
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
