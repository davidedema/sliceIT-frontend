import { createRouter, createWebHistory } from 'vue-router'

const DefaultLayout = import('@/layouts/default/Default.vue')
const DefaultUser = import('@/layouts/utente/Default.vue')
const StartPage = import('@/views/StartPage.vue')
const LoginPage = import('@/views/Login.vue')
const RegisterPage = import('@/views/Register.vue')
const HelpPage = import('@/views/Help.vue')
const HomePage = import('@/views/Home.vue')
const GroupsPage = import('@/views/Groups.vue')
const GroupPage = import('@/views/Group.vue')

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
        name: 'GroupsPage',
        component: () => GroupsPage,
      },
    ],
  },
  {
    path: '/groups/:id',
    component: () => DefaultUser,
    children: [
      {
        path: '',
        name: 'GroupPage',
        component: () => GroupPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
