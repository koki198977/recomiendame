<template>
  <div class="landing">
    <!-- Fondo -->
    <div class="bg-blur"></div>
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <div class="container glass card">
      <!-- Logo -->
      <img src="@/assets/logo.png" alt="Recomiéndame" class="logo" />
      <h1>Confirmación de Correo</h1>

      <!-- Mensaje -->
      <div
        v-if="statusMessage"
        :class="['msg', status === 'success' ? 'success' : 'error']"
      >
        {{ statusMessage }}
      </div>

      <!-- Botones -->
      <div class="btn-row">
        <router-link
          v-if="status === 'success'"
          class="btn primary"
          to="/"
        >
          ⬅ Volver al inicio
        </router-link>

        <router-link
          v-else
          class="btn ghost"
          to="/"
        >
          ⬅ Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '@/config'

export default {
  name: 'EmailConfirmed',
  data() {
    return { status: null }
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
      this.status = data.status // 'success' | 'expired' | 'invalid'
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
    }
  }
}
</script>

<style scoped>
/* Fondo estilo Home */
.landing {
  position: relative;
  min-height: 100vh;
  color: #fff;
  background: radial-gradient(
    1200px 600px at 10% 0%,
    #1b1f3a 0%,
    #0a0b12 60%,
    #07070c 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.bg-blur {
  position: absolute;
  inset: -20%;
  filter: blur(60px);
  opacity: 0.35;
  pointer-events: none;
  background: radial-gradient(600px 400px at 80% 10%, #7c4dff 0%, transparent 60%),
    radial-gradient(500px 300px at 15% 30%, #00d4ff 0%, transparent 60%),
    radial-gradient(700px 500px at 70% 80%, #00ffa3 0%, transparent 65%);
}
.bg-blob {
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.18;
  pointer-events: none;
  mix-blend-mode: screen;
  animation: float 14s ease-in-out infinite;
}
.blob-1 {
  left: -120px;
  top: 120px;
  background: #6a5acd;
}
.blob-2 {
  right: -140px;
  top: 40px;
  background: #00c2ff;
  animation-delay: 5s;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(30px);
  }
}

/* Card glass */
.container {
  max-width: 600px;
  width: 100%;
  padding: 0 20px;
}
.glass.card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  padding: 32px;
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Logo y título */
.logo {
  width: 80px;
  margin: 0 auto 1rem;
}
h1 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #00ffa3;
}

/* Mensaje */
.msg {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 500;
}
.msg.success {
  background: #fff;
  color: #000;
}
.msg.error {
  background: #c62828;
  color: #fff;
}

/* Botones */
.btn {
  display: inline-block;
  padding: 12px 18px;
  border-radius: 12px;
  font-weight: 700;
  letter-spacing: 0.2px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  text-align: center;
}
.btn.primary {
  background: linear-gradient(135deg, #00ffa3 0%, #00c2ff 100%);
  color: #04121a;
  box-shadow: 0 10px 28px rgba(0, 194, 255, 0.25);
}
.btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 36px rgba(0, 194, 255, 0.35);
}
.btn.ghost {
  background: rgba(255, 255, 255, 0.06);
}
.btn.ghost:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}

.btn-row {
  margin-top: 1rem;
  text-align: center;
}
</style>
