<script setup lang="ts">
  import { useStatStore } from '@/stores/stat'
  import { storeToRefs } from 'pinia';

  const statStore = useStatStore()
  statStore.fetchStats()

  const { getAllWords, getKnownWords } = storeToRefs(statStore)
</script>

<template>
  <div class="container mx-auto mt-16">

    <div class="text-center">
      <v-icon size="small" icon="mdi-poll"/>
      <h2 class="text-h4 mb-5">  
        Statistics
      </h2>
    </div>

    
    <div>You have <b>{{ getAllWords }}</b> words in your library</div>

    <div>You have learned <b>{{ getKnownWords }}</b> words</div> 
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 450px;
  padding: 3em;
  border: $light-border;
}
</style>

