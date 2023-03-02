<script setup lang="ts">
import { ref } from 'vue'
import Word from '@/types/word'
import { useWordStore } from '@/stores/word'

defineProps<{ words: Word[] }>()

const wordStore = useWordStore()

let itemsPerPage = ref(100)
const headers = [
  { title: 'Word', key: 'origin' },
  { title: 'Translation', key: 'translation' },
  { title: 'Proficiency', key: 'proficiency' },
  { title: 'Actions', key: 'actions', sortable: false },
]

function getProgressColor(proficiency: number) {
  if (proficiency >= 75 ) return 'green'
  else if (proficiency >= 50) return 'orange'
  else if (proficiency >= 25) return 'amber'
  else return 'grey-lighten-2'
}

function removeWord(wordId: number) {
  wordStore.deleteWord(wordId)
}
</script>

<template>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="words"
  >

    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template #item.proficiency="{ item }">
      <v-progress-linear 
        :model-value="item.raw.proficiency"
        :color="getProgressColor(item.raw.proficiency)"
        height="8"
        rounded
      />
    </template>

    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template #item.actions="{ item }">
      <v-icon
        class="align-right"
        size="small"
        icon="mdi-trash-can-outline"
        @click="removeWord(item.raw.id)"
      />
    </template>

  </v-data-table>
</template>

<style scoped>
.delete-action {
  align-items: right;
}
</style>