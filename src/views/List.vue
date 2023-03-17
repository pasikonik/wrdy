<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'
import { useWordStore } from '@/stores/word'
import List from '@/types/list'
import Word from '@/types/word'
import NewWordForm from '@/components/NewWordForm.vue'
import WordListing from '@/components/WordListing.vue'
import ListHeader from '@/components/ListHeader.vue'

const props = defineProps<{ listId: number }>()

const isFetching = ref(true)

const listStore = useListStore()
const wordStore = useWordStore()

const { getListById } = storeToRefs(listStore)
const { wordsForList } = storeToRefs(wordStore)

wordStore.fetchWords(props.listId).then(() => {
  isFetching.value = false
})
</script>
wordStore

<template>
  <section v-if="!isFetching" class="">
    <list-header :list="getListById(listId) as List" />

    <h4 class="text-h6 ml-4">words: {{ wordsForList(listId).length }}</h4>

    <new-word-form :list-id="listId" />

    <word-listing :words="wordsForList(listId) as Word[]" />
  </section>
</template>
