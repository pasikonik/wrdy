<script setup lang="ts">
import { ref } from 'vue'
import type List from '@/types/list'
import { useRouter } from 'vue-router'
import { useListStore } from '@/stores/list'

const router = useRouter()
const store = useListStore()

const props = defineProps<{ list: List }>()

const isEditing = ref(false)
const newName = ref(props.list.name)

const deleteList = async () => {
  await store.deleteList(props.list.id)
  router.push('/lists')
}

const updateList = async () => {
  await store.updateList({ id: props.list.id, name: newName.value })
  isEditing.value = false
}

const cancelEditing = () => {
  isEditing.value = false
  newName.value = props.list.name
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
    <h1 v-else class="text-h3 ml-3 list-name" @click="isEditing = true">
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
.list-name {
  cursor: pointer;
  padding: 11px 0;
}

.input-name {
  padding: 0 16px;
  width: 70%;
}

.delete-button {
  visibility: hidden;
  position: absolute;
  top: 10px;
  right: 0;
  border: 0;
}

.header {
  position: relative;

  &:hover .delete-button {
    visibility: visible;
  }
}

:deep(.v-btn--icon.delete-button) {
  i {
    color: $strong-gray;
  }

  &:hover {
    i {
      color: $light-red;
    }
  }
}

:deep(.input-name .v-field__input) {
  font-size: 3rem;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
