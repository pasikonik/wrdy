<script setup lang="ts">
import api from '@/lib/api'
import { ref } from 'vue'
import { useListStore } from '@/stores/list'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import type List from '@/types/list'

const router = useRouter()

const listStore = useListStore()
listStore.fetchLists()

const { getAllNames } = storeToRefs(listStore)

const files = ref<File[]>([])
const listToImport = ref()

async function importFile() {
  if (!files.value.length) return

  const file = files.value[0]
  const form = new FormData()
  form.append('file', file)
  form.append('list', listToImport.value)

  const list: List = await api.sendFile('import', form)
  router.push({ name: 'list', params: { id: list.id } })
}
</script>

<template>
  <div class="container mx-auto mt-16">
    <h2 class="text-h4 mb-5">
      <v-icon icon="mdi-upload" />
      Import csv file
    </h2>

    <v-combobox
      v-model="listToImport"
      :items="getAllNames"
      label="Select list or create new one"
      variant="outlined"
    ></v-combobox>

    <v-file-input
      v-model="files"
      show-size
      prepend-icon="mdi-file-document-outline"
      accept=".csv"
      label="File with translations"
      variant="outlined"
    />

    <v-btn
      block
      size="x-large"
      variant="tonal"
      color="green"
      append-icon="mdi-send"
      @click="importFile"
      >Send
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 450px;
  padding: 3em;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
