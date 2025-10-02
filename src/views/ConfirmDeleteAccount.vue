<template>
  <div class="landing">
    <!-- Fondo (igual a DeleteAccount/ResetPassword) -->
    <div class="bg-blur"></div>
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <div class="container glass card">
      <img :src="logoUrl" alt="Recomiéndame" class="logo" />
      <h1>Confirmar Eliminación</h1>

      <!-- Estado -->
      <p v-if="loading" class="loading">Procesando...</p>

      <div v-else class="content">
        <div :class="['msg', ok ? 'success' : 'error']">
          {{ message }}
        </div>

        <div class="btn-row">
          <router-link class="btn ghost" to="/">⬅ Volver al inicio</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '../config';

export default {
  name: 'ConfirmDeleteAccount',
  data() {
    return {
      loading: true,
      ok: false,
      message: '',
      logoUrl: new URL('../assets/logo.png', import.meta.url).href,
    };
  },
  async created() {
    console.log('ConfirmDeleteAccount montado ✅');
    const token = this.$route.query.token;

    if (!token) {
      this.message = 'Token inválido o expirado';
      this.ok = false;
      this.loading = false;
      return;
    }

    try {
      await axios.post(`${API_URL}/auth/delete-account`, { token });
      this.message = 'Tu cuenta y datos asociados fueron eliminados.';
      this.ok = true;
    } catch (e) {
      // Si quieres tratar “Network/CORS” como éxito silencioso, puedes detectar e.code === 'ERR_NETWORK'
      this.message = e.response?.data?.message || 'No se pudo eliminar la cuenta';
      this.ok = false;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
/* === mismos estilos base que tus otras pantallas === */
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
  background:
    radial-gradient(600px 400px at 80% 10%, #7c4dff 0%, transparent 60%),
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

/* Card glass */
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

/* Logo y título */
.logo { width: 80px; margin: 0 auto 1rem; }
h1 { font-size: 1.4rem; margin-bottom: 0.75rem; color: #00ffa3; }

/* Estados/mensajes */
.loading { opacity: 0.9; margin-top: 0.5rem; }
.content { width: 100%; max-width: 640px; }
.msg {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  margin: 0.5rem auto 1rem;
  font-weight: 600;
}
.msg.success { background: #fff; color: #000; }
.msg.error { background: #c62828; color: #fff; }

/* Botones */
.btn {
  display: inline-block; padding: 12px 18px; border-radius: 12px; font-weight: 700; letter-spacing: 0.2px;
  backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.12); text-decoration: none; color: #fff;
  cursor: pointer; text-align: center;
}
.btn.ghost { background: rgba(255, 255, 255, 0.06); }
.btn.ghost:hover { background: rgba(255, 255, 255, 0.12); transform: translateY(-1px); }

.btn-row { margin-top: 0.5rem; text-align: center; }
</style>
