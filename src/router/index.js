import { createRouter, createWebHistory } from 'vue-router'

const DefaultLayout = import('@/layouts/default/Default.vue')
const DefaultUser = import('@/layouts/utente/Default.vue')
const StartPage = import('@/views/StartPage.vue')
const LoginPage = import('@/views/Login.vue')
const RegisterPage = import('@/views/Register.vue')
const HelpPage = import('@/views/Help.vue')
const HomePage = import('@/views/Home.vue')
const ProfilePage = import('@/views/Profilo.vue')

const routes = [
  {
    path: '',
    component: () => DefaultLayout,
    children: [
      {
        path: '',
        name: 'StartPage',
        component: () => StartPage,
      },
    ],
  },
  {
    path: '/login',
    component: () => DefaultLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: () => LoginPage,
      },
    ],
  },
  {
    path: '/register',
    component: () => DefaultLayout,
    children: [
      {
        path: '',
        name: 'register',
        component: () => RegisterPage,
      },
    ],
  },
  {
    path: '/help',
    component: () => DefaultLayout,
    children: [
      {
        path: '',
        name: 'help',
        component: () => HelpPage,
      },
    ],
  },
  {
    path: '/home',
    component: () => DefaultUser,
    children: [
      {
        path: '',
        name: 'home',
        component: () => HomePage,
      },
    ],
  },
  {
    path: '/groups',
    component: () => DefaultUser,
    children: [
      {
        path: '',
        name: 'groups',
        component: () => ProfilePage,
      },
    ],
  },
  {
    path: '/people',
    component: () => DefaultUser,
    children: [
      {
        path: '',
        name: 'people',
        component: () => ProfilePage,
      },
    ],
  },
  {
    path: '/stats',
    component: () => DefaultUser,
    children: [
      {
        path: '',
        name: 'stats',
        component: () => ProfilePage,
      },
    ],
  },
  {
    path: '/profile',
    component: () => DefaultUser,
    children: [
      {
        path: '',
        name: 'profile',
        component: () => ProfilePage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
