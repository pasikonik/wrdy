<script setup lang="ts">
import { ref, watchEffect, watch } from 'vue'
import List from '@/types/list'
import { useRouter } from 'vue-router'
import { useListStore } from '@/stores/list'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useListStore()
const { getListById } = storeToRefs(store)

const props = defineProps<{ listId: number }>()

let list = getListById.value(props.listId) as List

const isEditing = ref(false)
const newName = ref(list.name)

watch(isEditing, (newVal, oldVal) => {
  if (newVal == false && oldVal == true) {
    list = getListById.value(props.listId) as List
  }
})

const deleteList = async () => {
  await store.deleteList(list.id)
  router.push('/lists')
}

const updateList = async () => {
  await store.updateList({ id: list.id, name: newName.value })
  isEditing.value = false
}

const cancelEditing = () => {
  isEditing.value = false
  newName.value = list.name
}
</script>

<template>
  <div v-if="list" class="header">
    <v-text-field
      v-if="isEditing"
      v-model.trim="newName"
      class="input-name"
      label="Name"
      variant="outlined"
      autofocus
      :hide-details="true"
      @blur="cancelEditing"
      @keyup.esc="cancelEditing"
      @keyup.enter="updateList"
    ></v-text-field>
    <h1 v-else class="text-h3 ml-3 title" @click="isEditing = true">
      {{ list.name }}
    </h1>

    <v-btn
      v-if="!isEditing"
      class="delete-button"
      icon="mdi-trash-can-outline"
      color="error"
      variant="outlined"
      @click="deleteList"
    />
  </div>
</template>

<style scoped lang="scss">
.delete-button {
  visibility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
}
.header {
  position: relative;

  &:hover .delete-button {
    visibility: visible;
  }
}

.input-name {
  padding: 0 16px;
  width: 60%;
}

:deep(.input-name .v-field__input) {
  font-size: 3rem;
  padding-top: 0;
  padding-bottom: 0;
}

.title {
  cursor: pointer;
  padding: 11px 0;
}
</style>
