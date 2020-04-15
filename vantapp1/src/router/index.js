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
import addView from '../views/add.vue'
import MyFView from '../views/MyF.vue'
import AddFView from '../views/AddF.vue'
import FPlanView from '../views/FPlan.vue'
import DetailsView from '../views/Details.vue'
import PlanQView from '../views/PlanQ.vue'

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
    component:maxView,
    meta:{keepAlive: true}
  },
  {
    path:"/lunbo",
    component:lunboView
  },
  {
    path:"/longitem",
    component:longitemView,
    meta:{keepAlive: true}
  },
  {
    path:"/test",
    component:testView,
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
  {
    path:"/add",
    component:addView,
  },
  {
    path:"/MyF",
    component:MyFView,
  },
  {
    path:"/AddF",
    component:AddFView,
  },
  {
    path:"/FPlan",
    component:FPlanView,
  },
  {
    path:"/Details",
    component:DetailsView,
  },
  {
    path:"/PlanQ",
    component:PlanQView,
  },

]

const router = new VueRouter({
  mode: 'hash',//打包用hash 测试用history
  base: process.env.BASE_URL,
  routes
})

export default router

