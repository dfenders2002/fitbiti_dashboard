// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { store } from './store/store';
import Dashboard from './views/DashBoard.vue';
import UserList from './views/UserList.vue';
import Login from './views/Login.vue';
import Export from './views/Export.vue'
import AddFitbit from './views/AddFitBit.vue';
import AddUser from './views/AddUser.vue';
import EditFitBit from './views/EditFitBit.vue';


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
    path: '/dashboard/:pid',
    name: 'Dashboard',
    component: Dashboard,
    props: true,
  },
  {
    path: '/addUser',
    name: 'addUser',
    component: AddUser,
  },
  {
    path: '/edit/:pid',
    name: 'EditFitbit',
    component: EditFitBit,
    props: true,
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
