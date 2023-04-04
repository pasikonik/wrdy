<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useWordStore } from '@/stores/word'

const props = defineProps<{ listId: number }>()
const store = useWordStore()
const wordParams = reactive({
  origin: '',
  translation: '',
  list_id: props.listId,
})
const wordInput = ref<HTMLInputElement | null>(null)

async function addWord() {
  await store.createWord(wordParams)
  wordParams.origin = ''
  wordParams.translation = ''
  wordInput.value?.focus()
}
</script>

<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <v-text-field
            ref="wordInput"
            v-model="wordParams.origin"
            label="Word"
            density="compact"
            variant="outlined"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="5">
          <v-text-field
            v-model="wordParams.translation"
            label="Translation"
            density="compact"
            variant="outlined"
            hide-details
            required
            @keyup.enter="addWord"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2">
          <v-btn class="add-button" variant="outlined" block @click="addWord">
            Add
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped lang="scss">
button.add-button {
  height: 40px;
  font-weight: bold;
}
</style>
