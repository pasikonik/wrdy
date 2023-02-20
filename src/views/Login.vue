<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const store = useAuthStore()

const email = ref<string>('')
const password = ref<string>('')
const showPassword = ref<boolean>(false)

const credentials = computed(() => {
  return {
    email: email.value,
    password: password.value,
  }
})

async function login() {
  try {
    await store.retrieveToken(credentials.value)
    router.push('/lists')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <v-card width="300" class="pa-2 mx-auto mt-16" variant="outlined">
    <v-card-title class="text-center">
      <h2 class="display-1">Login</h2>
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
      <v-btn color="success" variant="outlined" block @click="login">
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
