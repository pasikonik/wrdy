<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <v-app>
    <navbar />

    <v-main>
      <router-view :key="$route.path" />
    </v-main>

    <v-footer>
      <div class="footer px-4 py-2 text-center w-100">
        <strong>Wrdy</strong> — {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </v-app>
</template>

<style scoped lang="scss">
.footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
