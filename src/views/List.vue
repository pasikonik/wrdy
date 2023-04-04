<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'
import { useWordStore } from '@/stores/word'
import NewWordForm from '@/components/NewWordForm.vue'
import WordListing from '@/components/WordListing.vue'
import ListHeader from '@/components/ListHeader.vue'

const props = defineProps<{ listId: number }>()

const isFetching = ref(true)

const listStore = useListStore()
const wordStore = useWordStore()

const { getListById } = storeToRefs(listStore)
const { wordsForList, wordsCount } = storeToRefs(wordStore)

wordStore.fetchWords(props.listId).then(() => {
  isFetching.value = false
})
</script>

<template>
  <section v-if="!isFetching">
    <list-header :list="getListById(listId)" />

    <div class="mx-4 d-flex align-center">
      <v-btn
        prepend-icon="mdi-play"
        color="blue"
        variant="flat"
        size="x-large"
        :to="{ name: 'play', params: { listId } }"
        >Play</v-btn
      >

      <span class="counter px-6"> Count: {{ wordsCount(listId) }} </span>
    </div>

    <new-word-form :list-id="listId" />

    <word-listing :words="wordsForList(listId)" />
  </section>
</template>

<style scoped lang="scss">
.counter {
  font-size: 1.1em;
  color: $strong-gray;
}
</style>
