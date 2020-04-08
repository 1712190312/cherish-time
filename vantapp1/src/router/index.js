import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import loginView from '../views/login.vue'
import forgetView from '../views/forget.vue'
import registeredView from '../views/registered.vue'
import maxView from '../views/max.vue'
import lunboView from '../views/lunbo.vue'
import longitemView from '../views/longitem.vue'
import testView from '../views/test.vue'
import mylcView from '../views/mylc.vue'
import settingView from '../views/setting.vue'
import goodView from '../views/good.vue'
import timedownView from '../views/timedown.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:"/login",
    component:loginView
  },
  {
    path:"/forget",
    component:forgetView
  },
  {
    path:"/registered",
    component:registeredView
  },
  {
    path:"/max",
    component:maxView
  },
  {
    path:"/lunbo",
    component:lunboView
  },
  {
    path:"/longitem",
    component:longitemView
  },
  {
    path:"/test",
    component:testView
  },
  {
    path:"/mylc",
    component:mylcView
  },
  {
    path:"/setting",
    component:settingView
  },
  {
    path:"/good",
    component:goodView
  },
  {
    path:"/timedown",
    component:timedownView
  },
]

const router = new VueRouter({
  mode: 'history',//hash
  base: process.env.BASE_URL,
  routes
})

export default router

