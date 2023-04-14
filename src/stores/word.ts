import api from '@/lib/api'
import { defineStore } from 'pinia'
import type Word from '@/types/word'
import { useListStore } from './list'
import { ref, computed } from 'vue'

interface WordParams {
  origin: string
  translation: string
  list_id: number
}

export const useWordStore = defineStore('word', () => {
  const listStore = useListStore()

  const all = ref<Map<number, Word>>(new Map())

  const wordsForList = computed(() => {
    return (listId: number): Word[] =>
      Array.from(all.value.values()).filter((word) => word.list_id == listId)
  })

  const pickWordsToLearn = computed(() => {
    return (listId: number) =>
      wordsForList
        .value(listId)
        .sort((a, b) => a.proficiency - b.proficiency)
        .slice(-5)
  })

  const wordsCount = computed(() => {
    return (listId: number): number => wordsForList.value(listId).length || 0
  })

  async function fetchWords(listId: number) {
    const words = await api.get(`lists/${listId}/words`)

    for (const word of words) {
      all.value.set(word.id, word)
    }
  }

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

  return {
    all,
    wordsForList,
    pickWordsToLearn,
    wordsCount,
    fetchWords,
    createWord,
    deleteWord,
  }
})
