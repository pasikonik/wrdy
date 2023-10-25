<script setup lang="ts">
import { ref } from 'vue'
import { useWordStore } from '@/stores/word'
import { storeToRefs } from 'pinia'
import LearnWords from '@/components/LearnWords.vue'
import LearnSummary from '@/components/LearnSummary.vue'
import type Entry from '@/types/entry'

const props = defineProps<{ listId: number }>()

const wordStore = useWordStore()
const { pickWordsToLearn } = storeToRefs(wordStore)
const isLoading = ref(true)
const isFinished = ref(false)
const efficiency = ref(0)
const improvedWords = ref(0)

wordStore.fetchWords(props.listId).then(() => {
  isLoading.value = false
})

const finalize = (entries: Entry[]) => {
  isFinished.value = true
  
  improvedWords.value = entries.length
  const cleans = entries.filter((e) => {
    return e.success == 1 && e.fail == 0
  }).length

  efficiency.value = Math.round(cleans / entries.length) * 100

  const wordIds = entries.map((entry) => entry.word.id)
  wordStore.updateProficiency(wordIds).then(() => {
    console.log('vocabulary proficiency improved')
  })
}

const nextPlay = () => {
  efficiency.value = 0
  improvedWords.value = 0
  isFinished.value = false
}
</script>

<template>
  <section>
    <div v-if="isLoading" class="d-flex flex-column align-center pa-16">
      <h1 class="text-h3 mb-10 text-grey-darken-1">Let's play a game</h1>
      <v-progress-linear
        :height="18"
        color="orange"
        rounded
        indeterminate
      ></v-progress-linear>
    </div>
    <div v-else>
      <learn-summary
        v-if="isFinished"
        :efficiency="efficiency"
        :improved-words="improvedWords"
        :list-id="listId"
        @next="nextPlay"
      />
      <learn-words
        v-else
        :words="pickWordsToLearn(listId)"
        @finish="finalize"
      />
    </div>
  </section>
</template>
