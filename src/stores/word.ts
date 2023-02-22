import api from '@/lib/api'
import { defineStore } from 'pinia'
import Word from '@/types/word'


export const useWordStore = defineStore('word', {
    state: () => {
        return {
            all: new Map() as Map<number, Word>
        }
    },
    actions: {
        async createWord(wordParams: unknown) {
            const newWord = await api.post('words', wordParams)
            this.all.set(newWord.id, newWord)
            return newWord
        },
        async delteWord(wordId: string) {
            api.delete(`words/${wordId}`)
        }
    }
})
