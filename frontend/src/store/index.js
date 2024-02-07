import { createStore } from 'vuex';
import authModule from './modules/auth';
import usersModule from './modules/users.js';
import generalModule from './modules/general.js';

const store = createStore({
  modules: {
    auth: authModule,
    users: usersModule,
    general: generalModule
  },
})

export default store;
