import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'
import './style.css'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'

const pinia = createPinia().use(createORM())

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
