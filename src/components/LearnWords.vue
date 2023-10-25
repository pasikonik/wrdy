<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import type Word from '@/types/word'
import type Entry from '@/types/entry'

const props = defineProps<{ words: Word[] }>()
const emit = defineEmits(['finish'])

const showCard = ref(true)
const isSuccess = ref(false)
const isFail = ref(false)
const pointer = ref(0)
const guess = ref('')
const input = ref(null)
const completed = ref<Entry[]>([])
const entries = ref<Entry[]>(
  props.words.map((word) => ({
    success: 0,
    fail: 0,
    word: word,
  })),
)

const currentEntry = computed(() => {
  return entries.value[pointer.value]
})

const allWordsCounter = computed(() => {
  return entries.value.length + completed.value.length
})

const progress = computed(() => {
  return (
    (completed.value.length / allWordsCounter.value) *
    100
  )
})

const slideIn = () => {
  showCard.value = true // animation 200ms
  nextTick(() => {
    ;(input.value as HTMLElement | null)?.focus()
  })
}

const next = (isChecked: boolean) => {
  guess.value = ''
  isFail.value = false
  isSuccess.value = false

  if (isChecked && currentEntry.value.success >= currentEntry.value.fail * 2) {
    completed.value.push(entries.value.shift() as Entry)
  } else {
    pointer.value++
  }

  if (pointer.value >= entries.value.length || entries.value.length == 0) {
    pointer.value = 0
  }

  if (entries.value.length == 0) {
    setTimeout(() => {
      emit('finish', completed.value)
    }, 500)
  } else {
    slideIn()
  }
}

const slideOut = (isChecked: boolean) => {
  showCard.value = false // animation 200ms

  setTimeout(() => {
    next(isChecked)
  }, 350)
}

const check = () => {
  if (currentEntry.value.word.origin == guess.value) {
    isSuccess.value = true
    currentEntry.value.success++

    setTimeout(() => {
      slideOut(true)
    }, 400)
  }
}

const markFail = () => {
  isFail.value = true
  currentEntry.value.fail++
  const flashTime = currentEntry.value.word.origin.length * 150

  setTimeout(() => {
    slideOut(false)
  }, flashTime)
}

const finish = () => {
  emit('finish', completed.value)
}
</script>

<template>
  <div class="status-bar rounded mb-8 pa-4 text-center">
    <span> Complete: {{ completed.length }} / {{ allWordsCounter }} </span>

    <v-progress-linear
      v-model="progress"
      class="mt-1"
      color="green"
      height="10"
    ></v-progress-linear>
  </div>

  <div class="card-container">
    <Transition name="slide">
      <v-card
        v-show="showCard"
        :class="[
          { fail: isFail, success: isSuccess },
          'mx-auto',
          'pa-3',
          'word-card',
        ]"
        max-width="420"
        variant="outlined"
      >
        <v-card-item class="text-center">
          <div class="text-h4 pt-10">
            {{ currentEntry?.word.translation }}
          </div>

          <div v-visibility="isFail" class="correct">
            {{ currentEntry?.word.origin }}
          </div>
        </v-card-item>

        <v-card-actions>
          <v-text-field
            ref="input"
            v-model="guess"
            :class="{ 'text-decoration-line-through': isFail }"
            density="compact"
            variant="outlined"
            hide-details
            required
            autofocus
            @keyup.enter="markFail"
            @update:model-value="check"
          ></v-text-field>

          <v-btn
            class="ml-4"
            color="green"
            variant="outlined"
            @click="markFail"
          >
            Check
          </v-btn>
        </v-card-actions>
      </v-card>
    </Transition>
  </div>

  <div class="action-bar rounded pa-2 text-right">
    Current: [{{ pointer + 1 }}] ׀ Success:
    {{ entries.map((e) => e.success) }} ׀ Fail: {{ entries.map((e) => e.fail) }}
    <v-btn class="mx-2" variant="outlined" @click="showCard = !showCard">
      Card TOGGLE
    </v-btn>
    <v-btn variant="outlined" @click="finish"> Finish </v-btn>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  height: 250px;
}

.word-card {
  border: $light-border;
}

.status-bar {
  border: $light-border;
}

.action-bar {
  border: $light-border;
}

.fail {
  border: 1px solid rgba($light-red, 0.8);
  box-shadow: none;
  animation: glow 0.3s ease-out 0s 1 normal forwards;
}

.success {
  border: 1px solid $primary-green;
  box-shadow: 0 0 30px rgba($primary-green, 0.8);
}

@keyframes glow {
  from {
    box-shadow: 0 0 1px $light-red;
  }
  to {
    box-shadow: 0 0 30px rgba($light-red, 0.8);
  }
}

.correct {
  color: green;
  font-size: 1.5em;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease-in;
}

.slide-enter {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-50%);
  opacity: 0;
}

.slide-enter-from {
  transform: translateX(50%);
  opacity: 0;
}
</style>
