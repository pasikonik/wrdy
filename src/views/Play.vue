<script setup lang="ts">
import { ref } from 'vue'
import { useWordStore } from '@/stores/word'
import { storeToRefs } from 'pinia'
import LearnWords from '@/components/LearnWords.vue'

defineProps<{ listId: number }>()

const isLoading = ref(false)

const wordStore = useWordStore()
const { pickWordsToLearn } = storeToRefs(wordStore)

// const words = pickWordsToLearn.value(props.listId)
</script>

<template>
  <setion>
    <div v-if="isLoading" class="d-flex flex-column align-center">
      <h1 class="text-h3 mb-10 text-grey-darken-1">Let's play a game</h1>
      <v-progress-circular
        :size="70"
        :width="7"
        color="orange"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <learn-words :words="pickWordsToLearn(listId)" />
    </div>
  </setion>
</template>
