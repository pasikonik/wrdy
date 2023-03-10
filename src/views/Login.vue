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
  <v-card width="300" class="pa-2 mx-auto mt-16" variant="outlined">
    <v-card-title class="text-center">
      <h2 class="text-h4 my-3">Login</h2>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="credentials.email"
          label="Email"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          v-model="credentials.password"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @keyup.enter="login"
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
