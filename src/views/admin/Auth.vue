<template>
  <v-container>
    <v-card width="400" class="mx-auto mt-16" rounded="lg">
      <v-card-title>Login</v-card-title>

      <v-card-text>
        <v-text-field v-model="auth.email" label="Email" variant="underlined" color="indigo-darken-2"
          prepend-inner-icon="mdi-at" />
        <v-text-field v-model="auth.password" :type="peek ? 'text' : 'password'" label="Password" variant="underlined"
          color="indigo-darken-2" prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="peek ? 'mdi-eye-off-outline' : 'mdi-eye-outline'" @click:append-inner="peek = !peek" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="auth.authenticateUser" :loading="auth.loading" class="bg-indigo-accent-4 text-white" block
          rounded="lg" flat>
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from '@/store/admin/auth'

const auth = useAuthStore()

const peek = ref(false)
</script>
