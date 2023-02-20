import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'
import './style.css'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import { useListStore } from '@/stores/list'
import { useAuthStore } from '@/stores/auth'

const pinia = createPinia().use(createORM())

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

const listStore = useListStore()
const authStore = useAuthStore()

if (authStore.isLoggedIn) {
  Promise.all([authStore.fetchCurrentUser(), listStore.fetchLists()]).then(
    () => {
      app.mount('#app')
    }
  )
} else {
  app.mount('#app')
}
