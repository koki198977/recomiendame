<template>
  <div class="card">
    <img src="@/assets/logo.png" alt="Logo" class="logo" />

    <div
      v-if="statusMessage"
      :class="[
        'w-full mb-4 p-3 text-center rounded',
        status === 'success'
          ? 'bg-white text-black'
          : 'bg-red-800 text-white'
      ]"
    >
      {{ statusMessage }}
    </div>

    
  </div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '@/config'

export default {
  name: 'EmailConfirmed',
  data() {
    return {
      status: null
    }
  },
  async created() {
    const token = this.$route.query.token
    if (!token) {
      this.status = 'invalid'
      return
    }
    try {
      const { data } = await axios.get(`${API_URL}/users/verify-email`, {
        params: { token }
      })
      this.status = data.status  // 'success' | 'expired' | 'invalid'
    } catch {
      this.status = 'invalid'
    }
  },
  computed: {
    statusMessage() {
      switch (this.status) {
        case 'success':
          return '✅ Tu correo ha sido confirmado con éxito.'
        case 'expired':
          return '❌ El enlace ha expirado.'
        default:
          return '❌ El enlace es inválido.'
      }
    },
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'Login' })
    },
  },
}
</script>

<style>
.card { /* …tus estilos… */ }
.logo { /* … */ }
.button { /* … */ }
</style>
