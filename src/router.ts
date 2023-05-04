// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Dashboard from './views/DashBoard.vue';
import UserList from './views/UserList.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/dashboard/:userId',
    name: 'Dashboard',
    component: Dashboard,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
