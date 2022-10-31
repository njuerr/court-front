// main.ts
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from "@/api/axios";
import router from "@/router/router";

const app = createApp(App)
app.use(ElementPlus).use(router)
app.mount('#app')
app.config.globalProperties.$axios = axios;
