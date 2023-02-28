import api from '@/lib/api'
import { defineStore } from 'pinia'
import Word from '@/types/word'
import { useListStore } from './list' 
import { ref } from 'vue'

interface WordParams {
    origin: string,
    translation: string,
    list_id: number
}

export const useWordStore = defineStore('word', () => {
    const listStore = useListStore()

    const all = ref<Map<number, Word>>(new Map()) 

    async function createWord(wordParams: WordParams) {
        const newWord = await api.post('words', wordParams)

        listStore.all.get(newWord.list_id)?.words?.push(newWord)
        all.value.set(newWord.id, newWord)
        return newWord
    }

    async function deleteWord(wordId: number) {
        await api.delete(`words/${wordId}`)

        all.value.delete(wordId)
    }

    return { all, createWord, deleteWord }
})



