import Vue from 'vue'
import VueRouter from 'vue-router'
import Agreement from '../views/Agreement.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Agreement',
    component: Agreement
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/autograph',
    name:'Autograph',
    component: () => import(/* webpackChunkName: "autograph" */ '../components/Autograph.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
