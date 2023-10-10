import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import { useAuthStore } from '@/stores/auth'
import vVisibility from '@/directives/visibility'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.directive('visibility', vVisibility)

const authStore = useAuthStore()

if (authStore.isLoggedIn) {
  await authStore.fetchCurrentUser()
  app.mount('#app')
} else {
  app.mount('#app')
}
