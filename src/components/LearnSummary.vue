<script setup lang="ts">
defineProps<{
  efficiency: number
  listId: number
}>()
</script>

<template>
  <h2 class="text-h4 text-center">Good job!</h2>

  Efficiency: {{ efficiency }}%

  <span>Improved proficiency for X words</span>

  <div class="d-flex justify-space-between">
    <v-btn
      variant="outlined"
      size="large"
      :to="{ name: 'list', params: { id: listId } }"
    >
      I'm done
    </v-btn>
    <v-btn
      color="green"
      variant="flat"
      size="large"
      :to="{ name: 'play', params: { id: listId } }"
    >
      Next play
    </v-btn>
  </div>
</template>
