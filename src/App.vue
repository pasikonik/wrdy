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
      <v-row justify="center" no-gutters>
        <v-col class="text-center mt-4" cols="12">
          <strong>Wrdy</strong> — {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style scoped></style>
