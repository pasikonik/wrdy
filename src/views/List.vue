<script setup lang="ts">
import { onMounted, computed, Ref, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useListStore } from '@/stores/list'
import List from '@/types/list'

const newWordOrigin = ref('')
const newWordTranslation = ref('')

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

function addWord() {
  console.log('adding word')
}

const deleteList = async () => {
  if (!list.value) return

  await store.deleteList(list.value.id)
  router.push('/lists')
}
</script>

<template>
  <main v-if="list" class="listContainer">
    <v-btn
      class="deleteButton"
      icon="mdi-trash-can-outline"
      color="primary"
      @click="deleteList"
    />

    <h1 class="d-flex align-center">
      {{ list.name }}
    </h1>

    <div>id: {{ list.id }}</div>
    <!-- <div>words: {{ list.words.length }}</div> -->

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="5">
            <v-text-field
              v-model="newWordOrigin"
              label="Origin"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="5">
            <v-text-field
              v-model="newWordTranslation"
              label="Translation"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2" class="pt-6">
            <v-btn color="primary" variant="text" @click="addWord"> Add </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <div>
      <div v-for="word in list.words" :key="word.id">
        {{ word.origin }} - {{ word.translation }} - {{ word.proficiency }}
      </div>
    </div>
  </main>
</template>

<style scoped>
.listContainer {
  text-align: left;
  position: relative;
}

.deleteButton {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
