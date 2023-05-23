import { createStore, useStore as vuexUseStore } from 'vuex';

export const store = createStore({
  state: {
    isLoggedIn: false,
    // add other state properties here...
    activeItem: null,
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },

    setActiveItem(state, item) {
      state.activeItem = item;
    },
    // add other mutations here...
  },
  actions: {
    // add actions here...
  },
  modules: {
    // add modules here...
  },
});

store.subscribe((mutation, state) => {
    if (mutation.type === 'login' || mutation.type === 'logout')  { 
        console.log('isLoggedIn changed to ' + state.isLoggedIn);
    }
});

export function useStore() {
  return vuexUseStore();
}
