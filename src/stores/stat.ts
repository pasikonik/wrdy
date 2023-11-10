import api from '@/lib/api'
import { defineStore } from 'pinia'

export const useStatStore = defineStore('stat', {
    state: () => {
        return {
            allWords: 0,
            knownWords: 0,
        }
    },
    getters: {
        getAllWords: (state) => state.allWords,
        getKnownWords: (state) => state.knownWords,
    },
    actions: {
        async fetchStats() {
            const stats = await api.get('stats')
            this.allWords = stats.all
            this.knownWords = stats.known
        }
    }
})