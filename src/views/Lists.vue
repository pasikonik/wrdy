<script setup lang="ts">
import { ref, computed } from 'vue'
import { useListStore } from '@/stores/list'
import List from '@/views/List.vue'

const newListName = ref('')

const store = useListStore()
store.fetchLists()

const lists = computed(() => {
  return [
    {}
  ]
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
      <v-list-item v-for="list in store.lists" :key="list.id" link>
        <v-list-item-title>
          {{ list.name }}
        </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <div class="addNew">
        <v-text-field v-model="newListName" label="new list" density="compact" :single-line="true" hide-details>
        </v-text-field>
      
        <v-btn variant="flat" color="success" class="plusButton" @click="addNewList">
          +
        </v-btn>
      </div>



    </v-list>

  </v-navigation-drawer>


  <v-main style="height: 300px; border: 1px solid black;">
    <list></list>
  </v-main>
  <!-- </v-layout> -->

</template>

<style scoped>
.addNew {
  display: flex;
  align-items: center;
}

.buttonWrapper {
  margin-inline-start: 0px;
}
.plusButton {
  font-size: xx-large;
}

.content {
  padding: 30px;
  border: 1px solid green;
}
</style>