<script setup lang="ts">
defineProps<{
  improvedWords: number
  efficiency: number
  listId: number
}>()

const emit = defineEmits(['next'])
</script>

<template>
  <div class="pa-10 text-center">
    <v-icon size="x-large" icon="mdi-trophy-outline" />
    <h2 class="text-h2 mb-5">Good job!</h2>
    <h4 class="text-h5">
      Clear efficiency: <i>{{ efficiency }}%</i>
    </h4>
    <h6 class="text-h6">
      Improved proficiency for <b>{{ improvedWords }} words</b>
    </h6>
    <div class="d-flex justify-space-evenly mt-10">
      <v-btn
        variant="outlined"
        size="large"
        :to="{ name: 'list', params: { id: listId } }"
      >
        I'm done
      </v-btn>
      <v-btn color="green" variant="flat" size="large" @click="emit('next')">
        Next play
      </v-btn>
    </div>
  </div>
</template>
