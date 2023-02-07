<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const store = useUserStore()

const email = ref<string>('')
const password = ref<string>('')
const showPassword = ref<boolean>(false)

function register() {
  store.create({ 
    email: email.value, 
    password: password.value,
  })
}
</script>

<template>
  <v-card width="300" class="pa-2 mx-auto mt-16" variant="outlined">
    <v-card-title class="text-center">
      <h2 class="display-1">Sign Up</h2>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
          label="Email"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn 
        color="success" 
        variant="outlined"
        @click="register"
        block 
      >
        Sign Up
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style></style>
