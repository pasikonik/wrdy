<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useListStore } from '@/stores/list'
import List from '@/types/list'
import Word from '@/types/word'
import NewWordForm from '@/components/NewWordForm.vue'
import WordListing from '@/components/WordListing.vue'
import ListHeader from '@/components/ListHeader.vue'

const list: Ref<List | null> = ref(null)

const route = useRoute()
const store = useListStore()

watch(
  () => route.params.id as string,
  async (newId) => {
    list.value = await store.fetchList(newId)
  },
  { immediate: true }
)
</script>

<template>
  <section v-if="list" class="">
    <list-header :list="list" :list-id="list.id" />

    <h4 v-if="list.words" class="text-h6 ml-4">
      words: {{ list.words.length }}
    </h4>

    <new-word-form :list-id="list.id" />

    <word-listing v-if="list.words?.length" :words="list.words as Word[]" />
  </section>
</template>

<style scoped lang="scss"></style>
