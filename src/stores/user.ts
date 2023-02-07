import api from '@/lib/api'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

interface userParams {
    email: string,
    password: string,
}

export const useUserStore = defineStore('user', {
    actions: {
        async create(params: userParams) {
            try {
                const auth = useAuthStore()
                const user = await api.post('users', params)
                auth.currentUser = user
            } catch (error) {
                console.log(error);
                
            }
        }
    }
})