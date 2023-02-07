<script setup lang="ts">
import Nav from "@/types/nav"
import { useAuthStore } from "@/stores/auth"

const store = useAuthStore()

const nav: readonly Nav[] = [
  {
    icon: "mdi-home",
    text: "Home",
    path: "/",
  },
  {
    icon: "mdi-format-list-bulleted-square",
    text: "Lists",
    path: "/lists",
  },
  {
    icon: "mdi-file-download-outline",
    text: "import",
    path: "/import",
  },
  {
    icon: "mdi-chart-bar",
    text: "stats",
    path: "/stats",
  },
] 

</script>

<template>
  <v-app-bar 
    id="app-bar" 
    border="b" 
    flat
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon>
        <v-icon large icon="mdi-alpha-w-circle-outline" />
      </v-app-bar-nav-icon>
      <v-app-bar-title>
        Wrdy
      </v-app-bar-title>
    </template>

    <slot>
      <v-btn 
        v-for="item in nav" 
        :key="item.icon" 
        :to="item.path" 
        :prepend-icon="item.icon" 
        size="x-large" 
        variant="flat"
      >
        {{ item.text }}
      </v-btn>
    </slot>

    <template v-slot:append>
      <v-btn v-if="store.currentUser" @click="store.logout" variant="text">
        {{ store.currentUser.email }}
        <v-icon class="ml-2">mdi-logout-variant</v-icon>
      </v-btn>

      <div v-if="!store.isLoggedIn">
        <v-btn to="/login" variant="text"> Login </v-btn>
        <v-btn to="/sign-up" variant="text"> Sign Up </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>