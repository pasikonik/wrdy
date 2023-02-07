import api from '@/lib/api'
import { defineStore } from 'pinia'

interface List {
    id: number,
    name: string,
}


export const useListStore = defineStore('list', {
    state: () => {
        return {
            lists: [] as List[]
        }
    },
    actions: {
        async createList(newListName: string) {
            const newList = api.post('lists', { name: newListName })
            this.lists.push(newList)
        },
        async fetchLists() {
            const result = await api.get('lists')
            this.lists = result
        }
    }
})