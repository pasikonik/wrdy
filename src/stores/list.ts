import api from '@/lib/api'
import { defineStore } from 'pinia'
import List from '@/types/list'

export const useListStore = defineStore('list', {
  state: () => {
    return {
      all: new Map() as Map<number, List>,
    }
  },
  getters: {
    getListById: (state) => {
      return (listId: string) => state.all.get(Number(listId))
    },
  },
  actions: {
    async createList(newListName: string) {
      const newList = await api.post('lists', { name: newListName })
      this.all.set(newList.id, newList)
    },
    async fetchLists() {
      const lists = await api.get('lists')
      for (const list of lists) {
        this.all.set(list.id, list)
      }
      return lists
    },
    async fetchList(id: string) {
      const list = await api.get(`lists/${id}`)
      this.all.set(list.id, list)
      return list
    },
    async deleteList(listId: string) {
      await api.delete(`lists/${listId}`)
      this.all.delete(Number(listId))
      return Promise.resolve()
    },
  },
})
