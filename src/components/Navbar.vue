<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()
</script>

<template>
  <v-app-bar id="app-bar" border="b" flat>
    <template #prepend>
      <v-app-bar-nav-icon>
        <v-icon size="x-large" icon="mdi-alpha-w-circle-outline" />
      </v-app-bar-nav-icon>
      <v-app-bar-title> Wrdy </v-app-bar-title>
    </template>

    <template #append>
      <div v-if="store.isLoggedIn">
        <v-btn
          v-if="store.currentUser"
          variant="text"
          size="x-large"
          prepend-icon="mdi-account-circle"
        >
          {{ store.currentUser.email }}
        </v-btn>
        <v-btn class="ml-2" icon="mdi-logout-variant" @click="store.logout" />
      </div>

      <div v-else>
        <v-btn to="/login" variant="text" size="large"> Login </v-btn>
        <v-btn to="/sign-up" variant="text" size="large"> Sign Up </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>
