import api from '@/lib/api'
import { defineStore } from 'pinia'

interface List {
  id: string
  name: string
}

export const useListStore = defineStore('list', {
  state: () => {
    return {
      lists: [] as List[],
    }
  },
  getters: {
    getListById: (state) => {
      return (listId: string) => state.lists.find((list) => list.id == listId)
    },
  },
  actions: {
    async createList(newListName: string) {
      const newList = await api.post('lists', { name: newListName })
      this.lists.push(newList)
    },
    async fetchLists() {
      const result = await api.get('lists')
      this.lists = result
    },
    async destroyList(listId) {
      await api.delete(`lists/${listId}`)
    },
  },
})
