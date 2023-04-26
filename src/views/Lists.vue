<script setup lang="ts">
import { ref, computed } from 'vue'
import { useListStore } from '@/stores/list'
import Play from '@/views/Play.vue'
import List from '@/views/List.vue'
import NoList from '@/components/NoList.vue'
import { useRoute, useRouter } from 'vue-router'

const newListName = ref('')
const isLoading = ref(false)

const route = useRoute()
const router = useRouter()
const store = useListStore()

const paramListId = computed(() => parseInt(route.params.id as string))

isLoading.value = true
store.fetchLists().then((result) => {
  isLoading.value = false
  if (route.params.id || !result.length) return

  router.push({ name: 'list', params: { id: result[0].id } })
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
      <play v-if="route.name == 'play'" :list-id="paramListId" />
      <list v-else-if="route.name == 'list'" :list-id="paramListId" />
      <no-list v-else-if="!isLoading" />
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
  padding: 30px 0;
  min-height: calc(100vh - 114px);
}

.main {
  flex-grow: 0;
  padding: 40px;
  width: 750px;
  margin: 0 auto;
  min-height: 500px;
  border: $light-border;
}
</style>
