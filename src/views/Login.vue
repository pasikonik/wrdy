<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const store = useAuthStore()

const credentials = reactive({
  email: '',
  password: '',
})
const showPassword = ref<boolean>(false)

async function login() {
  try {
    await store.retrieveToken(credentials)
    router.push('/lists')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <v-card
    class="mx-auto mt-15 pa-12 pb-8"
    elevation="12"
    max-width="448"
    rounded="lg"
  >
    <v-card-title class="text-center">
      <h1 class="text-h3">Login</h1>
    </v-card-title>

    <div class="text-subtitle-1 text-medium-emphasis">Account</div>

    <v-text-field
      v-model="credentials.email"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
    ></v-text-field>

    <div class="text-subtitle-1 text-medium-emphasis">Password</div>

    <v-text-field
      v-model="credentials.password"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="showPassword = !showPassword"
    ></v-text-field>

    <v-btn
      block
      class="mb-8 mt-4"
      color="green"
      size="x-large"
      variant="tonal"
      @click="login"
    >
      Log In
    </v-btn>

    <v-card-text class="text-center">
      <router-link to="/sign-up" class="text-blue text-decoration-none"
        >Sign up now
        <v-icon icon="mdi-chevron-right" />
      </router-link>
    </v-card-text>
  </v-card>
</template>
