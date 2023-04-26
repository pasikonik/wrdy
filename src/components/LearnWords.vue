<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type Word from '@/types/word'
import type Entry from '@/types/entry'

const props = defineProps<{ words: Word[] }>()
const emit = defineEmits(['finish'])

const entries = ref<Entry[]>([])
const showCard = ref(true)
const pointer = ref(0)
const guess = ref('')

for (const word of props.words) {
  entries.value.push({
    success: 0,
    fail: 0,
    word: word,
  })
}

const incomplete = computed(() => {
  return entries.value.filter(({ success, fail }) => {
    return success == 0 || success < fail * 2
  })
})

const complete = computed(() => {
  return entries.value.filter((e) => !incomplete.value.includes(e))
})

const currentEntry = computed(() => {
  return incomplete.value[pointer.value]
})

const progress = computed(() => {
  return (complete.value.length / entries.value.length) * 100
})

const jumpNext = () => {
  guess.value = ''
  if (pointer.value + 1 >= incomplete.value.length) {
    pointer.value = 0
  } else {
    pointer.value++
  }
}

const check = () => {
  if (currentEntry.value.word.translation == guess.value) {
    currentEntry.value.success++
    jumpNext()
  }
}

const markFail = () => {
  currentEntry.value.fail++
  jumpNext()
}

const finish = () => {
  emit('finish', complete.value)
}

watch(
  () => incomplete.value.length,
  (left) => {
    if (left == 0) {
      finish()
    }
  }
)
</script>

<template>
  <div class="status-bar rounded mb-4 pa-4 text-center">
    <span> Complete: {{ complete.length }} / {{ entries.length }} </span>

    <v-progress-linear
      v-model="progress"
      class="mt-1"
      color="green"
      height="10"
    ></v-progress-linear>
  </div>

  <Transition name="slide-fade">
    <v-card
      v-show="showCard"
      class="mx-auto my-8 pa-3 word-card"
      max-width="400"
      variant="outlined"
    >
      <v-card-item>
        <div class="text-h4 mb-1 pa-8 text-center">
          {{ incomplete[pointer].word.origin }}
        </div>
      </v-card-item>

      <v-card-actions>
        <v-text-field
          v-model="guess"
          density="compact"
          variant="outlined"
          hide-details
          required
          autofocus
          @keyup.enter="markFail"
          @update:model-value="check"
        ></v-text-field>

        <v-btn class="ml-4" color="green" variant="outlined" @click="markFail">
          Check
        </v-btn>
      </v-card-actions>
    </v-card>
  </Transition>

  <div class="action-bar rounded mt-5 pa-2 text-right">
    <v-btn variant="outlined" @click="finish"> Finish </v-btn>
  </div>

  <br />
  <h2 class="text-h5">helper:</h2>
  <div v-for="entry in entries" :key="entry.word.id">
    {{ entry.word.origin }} - {{ entry.word.translation }} |
    {{ entry.success }} : {{ entry.fail }}
  </div>
</template>

<style scoped lang="scss">
.word-card {
  border: $light-border;
}

.status-bar {
  border: $light-border;
}

.action-bar {
  border: $light-border;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(80px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-80px);
  opacity: 0;
}
</style>
