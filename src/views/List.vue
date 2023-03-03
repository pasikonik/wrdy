<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useListStore } from '@/stores/list'
import List from '@/types/list'
import Word from '@/types/word'
import NewWordForm from '@/components/NewWordForm.vue'
import WordListing from '@/components/WordListing.vue'

const list: Ref<List | null> = ref(null)

const route = useRoute()
const router = useRouter()
const store = useListStore()

watch(
  () => route.params.id as string,
  async (newId) => {
    list.value = await store.fetchList(newId)
  },
  { immediate: true }
)

const deleteList = async () => {
  if (!list.value) return

  await store.deleteList(list.value.id)
  router.push('/lists')
}
</script>

<template>
  <main v-if="list" class="container text-left">
    <h2 class="text-h2">
      {{ list.name }}
    </h2>

    <v-btn
      class="delete-button"
      icon="mdi-trash-can-outline"
      color="error"
      size="small"
      variant="outlined"
      @click="deleteList"
    />

    <h4 v-if="list.words">words: {{ list.words.length }}</h4>

    <new-word-form :list-id="list.id" />

    <word-listing :words="list.words as Word[]" />
  </main>
</template>

<style scoped lang="scss">
.container {
  position: relative;
}

.delete-button {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
}
</style>
