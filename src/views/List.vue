<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useListStore } from '@/stores/list'
import List from '@/types/list'
import NewWordForm from '@/components/NewWordForm.vue'

const list: Ref<List | null> = ref(null)

const route = useRoute()
const router = useRouter()
const store = useListStore()

watch(
  () => route.params.id as string,
  async (newId) => {
    list.value = await store.fetchList(newId)
  }
, { immediate: true })



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
      class="deleteButton"
      icon="mdi-trash-can-outline"
      color="error"
      size="small"
      variant="outlined"
      @click="deleteList"
    />

    <h4 v-if="list.words">words: {{ list.words.length }}</h4>

    <new-word-form :list-id="list.id" />

    <div>
      <div v-for="word in list.words" :key="word.id">
        {{ word.origin }} - {{ word.translation }} - {{ word.proficiency }}
      </div>
    </div>
  </main>
</template>

<style scoped>list
.container {
  position: relative;
}

.deleteButton {
  position: absolute;
  top: 85px;
  right: 20px;
  border: 0;
}
</style>
