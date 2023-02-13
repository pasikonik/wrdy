<script setup lang="ts">
import { ref, computed } from 'vue'
import { useListStore } from '@/stores/list'
import List from '@/views/List.vue'

const newListName = ref('')

const store = useListStore()
store.fetchLists()

const lists = computed(() => {
  return [{}]
})

async function addNewList() {
  await store.createList(newListName.value)
  newListName.value = ''
}
</script>

<template>
  <!-- <v-layout> -->
  <v-navigation-drawer id="app-drawer" permanent>
    <v-list nav>
      <v-list-item
        v-for="list in store.lists"
        :key="list.id"
        :to="{ name: 'list', params: { id: list.id } }"
        link
      >
        <v-list-item-title>
          {{ list.name }}
        </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <div class="addNew">
        <v-text-field
          v-model="newListName"
          label="new list"
          density="compact"
          :single-line="true"
          hide-details
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
    <list></list>
  </v-main>
  <!-- </v-layout> -->
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
  min-width: 400px;
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
