<script setup lang="ts">
import Nav from '@/types/nav'
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()

const nav: readonly Nav[] = [
  {
    icon: 'mdi-home',
    text: 'Home',
    path: '/',
  },
  {
    icon: 'mdi-format-list-bulleted-square',
    text: 'Lists',
    path: '/lists',
  },
  {
    icon: 'mdi-file-download-outline',
    text: 'Import',
    path: '/import',
  },
  {
    icon: 'mdi-chart-bar',
    text: 'Stats',
    path: '/stats',
  },
]
</script>

<template>
  <v-navigation-drawer
    v-if="store.isLoggedIn"
    name="navigation"
    class="text-left"
    width="200"
    permanent
  >
    <v-list nav class="text-h5" select-strategy="leaf">
      <v-list-item
        v-for="item in nav"
        :key="item.icon"
        :prepend-icon="item.icon"
        :title="item.text"
        :to="item.path"
      />
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn variant="outlined" block> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>
