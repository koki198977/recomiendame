
created() {
  console.log('DeleteAccount montado 🚀')
}
<template>
  <div class="landing">
    <!-- Fondo (mismo fondo que ResetPassword) -->
    <div class="bg-blur"></div>
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <div class="container glass card">
      <img :src="logoUrl" alt="Recomiéndame" class="logo" />
      <h1>Eliminar Cuenta</h1>

      <div v-if="message" :class="['msg', messageType === 'success' ? 'success' : 'error']">
        {{ message }}
      </div>

      <template v-if="!success">
        <div class="form">
          <input
            type="email"
            v-model="email"
            placeholder="Tu correo registrado"
            class="input"
          />
          <button @click="submit" :disabled="loading" class="btn primary">
            <span v-if="!loading">Solicitar eliminación</span>
            <span v-else>Enviando...</span>
          </button>
        </div>
      </template>

      <div class="btn-row">
        <router-link class="btn ghost" to="/">⬅ Volver al inicio</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '../config'

export default {
  name: 'DeleteAccount',
  data() {
    return {
      email: '',
      loading: false,
      message: '',
      messageType: '',
      success: false,
      // usar new URL por si el alias @ no está
      logoUrl: new URL('../assets/logo.png', import.meta.url).href
    }
  },
  
  methods: {
    clearMessage(delay = 4000) {
      setTimeout(() => {
        this.message = ''
        this.messageType = ''
      }, delay)
    },
    async submit() {
      if (!this.email) {
        this.messageType = 'error'
        this.message = 'Debes ingresar tu correo'
        this.clearMessage()
        return
      }
      this.loading = true
      try {
        await axios.post(`${API_URL}/auth/request-delete-account`, { email: this.email })
        this.messageType = 'success'
        this.message = 'Se ha enviado un correo con instrucciones para eliminar tu cuenta.'
        this.success = true
      } catch (e) {
        this.message = 'Se ha enviado un correo con instrucciones para eliminar tu cuenta.'
        this.clearMessage()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* === mismos estilos que ResetPassword.vue === */
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
.blob-1 { left: -120px; top: 120px; background: #6a5acd; }
.blob-2 { right: -140px; top: 40px; background: #00c2ff; animation-delay: 5s; }
@keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(30px) } }

.container { max-width: 1120px; width: 100%; padding: 0 20px; }
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
.logo { width: 80px; margin: 0 auto 1rem; }
h1 { font-size: 1.4rem; margin-bottom: 1rem; color: #00ffa3; }

.msg { width: 100%; max-width: 640px; padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; font-weight: 500; }
.msg.success { background: #fff; color: #000; }
.msg.error { background: #c62828; color: #fff; }

.form { width: 100%; max-width: 560px; margin: 8px auto 0; display: flex; flex-direction: column; align-items: center; padding: 0 10px; }
@media (min-width: 1280px) { .form { max-width: 640px; } }

.input {
  width: 100%; padding: 0.95rem; margin-bottom: 0.9rem; border: none; border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.08); color: #fff; font-size: 1rem; box-sizing: border-box;
}
.input:focus { outline: 2px solid #00c2ff; }

.btn {
  display: inline-block; padding: 12px 18px; border-radius: 12px; font-weight: 700; letter-spacing: 0.2px;
  backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.12); text-decoration: none; color: #fff;
  cursor: pointer; text-align: center;
}
.btn.primary {
  width: 100%; background: linear-gradient(135deg, #00ffa3 0%, #00c2ff 100%); color: #04121a;
  box-shadow: 0 10px 28px rgba(0, 194, 255, 0.25);
}
.btn.primary:hover { transform: translateY(-1px); box-shadow: 0 14px 36px rgba(0, 194, 255, 0.35); }
.btn.ghost { background: rgba(255, 255, 255, 0.06); }
.btn.ghost:hover { background: rgba(255, 255, 255, 0.12); transform: translateY(-1px); }
.btn[disabled] { opacity: 0.6; cursor: not-allowed; }

.btn-row { margin-top: 1rem; text-align: center; }
</style>
