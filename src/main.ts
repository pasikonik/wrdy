import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import { useAuthStore } from '@/stores/auth'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

const authStore = useAuthStore()

if (authStore.isLoggedIn) {
  await authStore.fetchCurrentUser()
  app.mount('#app')
} else {
  app.mount('#app')
}
