import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import i18n from './lang/i18n.js'

import _api from "./api.js"
await _api.connect()

console.log(1);
const app = createApp(App)

app.use(createPinia())

app.use(router)
app.use(i18n)
app.use(naive)

app.mount('#app')
