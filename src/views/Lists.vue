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
  if (route.params.id || !result.length) return

  const paramId = result[0].id
  router.push({ name: 'list', params: { id: paramId } })
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
        class="text-center"
        link
      >
        <v-list-item-title>
          {{ list.name }}
        </v-list-item-title>
      </v-list-item>

      <div class="mt-2 add-new">
        <v-text-field
          v-model="newListName"
          label="new list name"
          density="compact"
          variant="outlined"
          hide-details
          @keyup.enter="addNewList"
        >
        </v-text-field>

        <v-btn
          variant="flat"
          color="success"
          class="plus-button rounded-s-0"
          @click="addNewList"
        >
          +
        </v-btn>
      </div>
    </v-list>
  </v-navigation-drawer>

  <div class="container">
    <div class="main">
      <list
        v-if="route.params.id"
        :list-id="parseInt(route.params.id as string)"
      ></list>
      <no-list v-else-if="!isLoading"></no-list>
    </div>
  </div>
</template>

<style scoped lang="scss">
.add-new {
  display: flex;
  align-items: center;
}

.plus-button {
  font-size: xx-large;
}

.container {
  width: 100%;
  padding-top: 30px;
  min-height: calc(100vh - 114px);
}

.main {
  flex-grow: 0;
  padding: 40px;
  width: 750px;
  margin: 0 auto;
  min-height: 500px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
