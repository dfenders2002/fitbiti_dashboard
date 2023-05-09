// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Dashboard from './views/DashBoard.vue';
import UserList from './views/UserList.vue';
import Login from './views/Login.vue';
import Logout from './components/Logout.vue'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/dashboard/:userId',
    name: 'Dashboard',
    component: Dashboard,
    props: true,
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
