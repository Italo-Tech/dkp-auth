import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'animate.css'

import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import router from "./router/index.js";
import store from "./store";

createApp(App)
    .use(router)
    .use(store)
    .use(Toast, { position: POSITION.BOTTOM_RIGHT })
    .mount('#app')
