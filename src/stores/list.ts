import api from '@/lib/api'
import { defineStore } from 'pinia'
import List from '@/types/list'

interface listParams {
  id: number
  name: string
}

export const useListStore = defineStore('list', {
  state: () => {
    return {
      all: new Map() as Map<number, List>,
    }
  },
  getters: {
    getListById: (state) => {
      return (listId: number) => state.all.get(listId)
    },
    getAllNames: (state) => Array.from(state.all.values()).map((el) => el.name),
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
    async deleteList(id: number) {
      await api.delete(`lists/${id}`)
      this.all.delete(id)
      return Promise.resolve()
    },
    async updateList(params: listParams) {
      await api.put(`lists/${params.id}`, { name: params.name })
      const list = this.all.get(params.id)
      if (list) this.all.set(list.id, { ...list, name: params.name })
    },
  },
})
