// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { store } from './store/store';
import Dashboard from './views/DashBoard.vue';
import UserList from './views/UserList.vue';
import Login from './views/Login.vue';
import Logout from './components/Logout.vue'
import Export from './views/Export.vue'
import AddFitbit from './views/AddFitBit.vue';
import AddUser from './views/AddUser.vue';


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
  {
    path: '/export',
    name: 'export',
    component: Export,
  },
  {
    path: '/addFitBit',
    name: 'addFitbit',
    component: AddFitbit,
  },
  {
    path: '/addUser',
    name: 'addUser',
    component: AddUser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.isLoggedIn) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
