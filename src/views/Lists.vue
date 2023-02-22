<script setup lang="ts">
import { ref } from 'vue'
import { useListStore } from '@/stores/list'
import List from '@/views/List.vue'
import NoList from '@/components/NoList.vue'
import { useRoute, useRouter } from 'vue-router'

const newListName = ref('')
const isLoading = ref(false)

const route = useRoute()
const router = useRouter()
const store = useListStore()

isLoading.value = true
store.fetchLists().then((result) => {
  isLoading.value = false
  if(route.params.id || !result.length) return

  const paramId = result[0].id
  router.push({ name: 'list', params: { id: paramId }})
})

async function addNewList() {
  await store.createList(newListName.value)
  newListName.value = ''
}
</script>

<template>
  <v-navigation-drawer id="app-drawer" permanent>
    <v-list nav>
      <v-list-item
        v-for="[id, list] in store.all"
        :key="id"
        :to="{ name: 'list', params: { id } }"
        link
      >
        <v-list-item-title>
          {{ list.name }} :{{ list.id }}
        </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <div class="mt-2 addNew">
        <v-text-field
          v-model="newListName"
          label="new list"
          density="compact"
          :single-line="true"
          hide-details
          @keyup.enter="addNewList"
        >
        </v-text-field>

        <v-btn
          variant="flat"
          color="success"
          class="plusButton"
          @click="addNewList"
        >
          +
        </v-btn>
      </div>
    </v-list>
  </v-navigation-drawer>

  <v-main class="content">
    <list v-if="route.params.id"></list>
    <no-list v-else-if="!isLoading"></no-list>
  </v-main>
</template>

<style scoped>
.addNew {
  display: flex;
  align-items: center;
}

.plusButton {
  font-size: xx-large;
}

.content {
  min-height: 500px;
  min-width: 700px;
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
