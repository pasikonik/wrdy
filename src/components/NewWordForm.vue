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
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="5">
          <v-text-field
            v-model="wordParams.translation"
            label="Translation"
            required
            @keyup.enter="addWord"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2">
          <v-btn
            class="addButton"
            color="primary"
            variant="flat"
            block
            @click="addWord"
          >
            Add
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped>
button.addButton {
  height: 56px;
  font-weight: bold;
}
</style>
