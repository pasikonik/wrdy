import { defineStore } from 'pinia'

import Credentials from '@/types/credentials'

import api from '@/lib/api'

interface User {
  email: string
  username?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      currentUser: null as User | null,
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    logout() {
      localStorage.removeItem('token')
      location.reload()
    },
    async retrieveToken(credentials: Credentials) {
      try {
        const { token, user } = await api.post('login', credentials)
        localStorage.setItem('token', token)
        this.token = token
        this.currentUser = user
      } catch (error) {
        return error
      }
    },
    async fetchCurrentUser() {
      if (!this.token) return

      const user = await api.get('users/me')
      this.currentUser = user
    },
  },
})
