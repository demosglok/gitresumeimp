import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Edit from '@/views/Edit';
import Resume from '@/views/Resume';
import ViewByAccount from '@/views/ViewByAccount';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
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
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  },
    {
    path: '/viewbyaccount',
    name: 'ViewByAccount',
    component: ViewByAccount
  },

  {
    path: '/resume',
    name: 'Resume',
    component: Resume
  },
  {
    path: '/:githublogin',
    name: 'Resume',
    component: Resume,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
