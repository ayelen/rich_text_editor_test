import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { i18n } from './i18n/i18n'

const app = createApp(App)

app.use(createPinia())

createApp(App).use(i18n).mount('#app')
