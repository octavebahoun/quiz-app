import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import App from './App.vue'
import router from './router'
import { auth } from "./firebase";

console.log("Firebase auth ready :", auth)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
