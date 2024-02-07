import { createApp } from 'vue'
import App from './App.vue'
import 'animate.css'
import '@fortawesome/fontawesome-free/css/all.css';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './style.css'

import router from "./router/index.js";
import store from './store/index.js';

createApp(App)
    .use(router)
    .use(store)
    .use(Toast, { position: POSITION.BOTTOM_RIGHT })
    .mount('#app')
