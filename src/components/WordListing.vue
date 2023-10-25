<script setup lang="ts">
import { ref } from 'vue'
import type Word from '@/types/word'
import type DataTableHeader from '@/types/dataTableHeader'
import { useWordStore } from '@/stores/word'

defineProps<{ words: Word[] }>()

const store = useWordStore()

let itemsPerPage = ref(100)
const headers: DataTableHeader[] = [
  { title: 'Word', key: 'origin' },
  { title: 'Translation', key: 'translation' },
  { title: 'Proficiency', key: 'proficiency' },
  {
    title: '',
    key: 'actions',
    align: 'end',
    width: 10,
    sortable: false,
  },
]

function getProgressColor(proficiency: number) {
  if (proficiency >= 75) return 'green'
  else if (proficiency >= 50) return 'orange'
  else if (proficiency >= 25) return 'amber'
  else return 'grey-lighten-2'
}
</script>

<template>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="words"
  >
    <template #item.proficiency="{ item }">
      <v-progress-linear
        :model-value="item.proficiency"
        :color="getProgressColor(item.proficiency)"
        height="8"
        rounded
      />
    </template>

    <template #item.actions="{ item }">
      <v-icon
        class="action"
        size="small"
        icon="mdi-trash-can-outline"
        @click="store.deleteWord(item.id)"
      />
    </template>
  </v-data-table>
</template>

<style scoped lang="scss">
.action {
  opacity: 0;
  color: $gray;
}

tr:hover {
  i.action {
    opacity: 1;
    transition: opacity 0.6s ease 0.3s;

    &:hover {
      color: $light-red;
    }
  }
}
</style>
