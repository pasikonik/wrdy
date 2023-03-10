<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const store = useUserStore()

const userParams = reactive({
  email: '',
  password: '',
})
const showPassword = ref<boolean>(false)

async function register() {
  await store.create(userParams)
  router.push('/')
}
</script>

<template>
  <v-card width="300" class="pa-2 mx-auto mt-16" variant="outlined">
    <v-card-title class="text-center">
      <h2 class="text-h4 my-3">Sign Up</h2>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="userParams.email"
          label="Email"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          v-model="userParams.password"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          @keyup.enter="register"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" variant="outlined" block @click="register">
        Sign Up
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
