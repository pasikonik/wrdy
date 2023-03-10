<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Navigation from '@/components/Navigation.vue'
</script>

<template>
  <v-app>
    <navbar />

    <navigation />

    <v-main>
      <router-view :key="$route.path" />
    </v-main>

    <v-footer class="footer">
      <div class="py-1 text-center w-100">
        <strong>Wrdy</strong> — {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </v-app>
</template>

<style scoped lang="scss">
.footer {
  border-top: 1px solid rgb(0 0 0 / 0.1);
}
</style>
