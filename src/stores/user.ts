import api from '@/lib/api'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

interface userParams {
  email: string
  password: string
}

export const useUserStore = defineStore('user', {
  actions: {
    async create(params: userParams) {
      try {
        const auth = useAuthStore()
        await api.post('users', params)
        auth.retrieveToken(params)
      } catch (error) {
        console.log(error)
      }
    },
  },
})
