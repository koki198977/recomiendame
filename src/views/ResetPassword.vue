<template>
  <div class="card">
    <!-- Logo más pequeño y sobrio -->
    <img src="@/assets/logo.png" alt="Logo" class="logo" />
    <h1>Restablecer Contraseña</h1>

    <!-- Banner de mensaje -->
    <div
      v-if="message"
      :class="[
        'w-full mb-4 p-3 text-center rounded',
        messageType === 'success'
          ? 'bg-white text-black'
          : 'bg-red-800 text-white'
      ]"
    >
      {{ message }}
    </div>

    <!-- Formulario solo si no hubo éxito -->
    <template v-if="!success">
      <input
        type="password"
        v-model="password"
        placeholder="Nueva contraseña"
        class="input"
      />
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Repetir contraseña"
        class="input"
      />

      <button @click="submit" :disabled="loading" class="button">
        <span v-if="!loading">Enviar</span>
        <span v-else>Enviando...</span>
      </button>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '../config';

export default {
  name: 'ResetPassword',
  data() {
    return {
      password: '',
      confirmPassword: '',
      loading: false,
      token: null,
      message: '',
      messageType: '', // 'success' o 'error'
      success: false,  // indica que ya cambió correctamente
    };
  },
  created() {
    this.token = this.$route.query.token || null;
  },
  methods: {
    clearMessage(delay = 4000) {
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, delay);
    },
    async submit() {
      if (!this.token) {
        this.messageType = 'error';
        this.message = 'Token inválido o expirado';
        this.clearMessage();
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.messageType = 'error';
        this.message = 'Las contraseñas no coinciden';
        this.clearMessage();
        return;
      }
      this.loading = true;
      try {
        await axios.post(`${API_URL}/auth/reset-password`, {
          token: this.token,
          newPassword: this.password,
        });
        // éxito: muestra mensaje blanco y oculta el form
        this.messageType = 'success';
        this.message = '¡Tu contraseña ha sido restablecida correctamente!';
        this.success = true;
        // no redirigimos
      } catch (e) {
        this.messageType = 'error';
        this.message = e.response?.data?.message || 'Error al restablecer contraseña';
        this.clearMessage();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.card {
  background-color: #111;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 80px;
  margin: 0 auto 1rem;
}
h1 {
  color: #a855f7;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}
.input {
  width: 90%;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #222;
  color: #fff;
  font-size: 1rem;
  text-align: left;
}
.button {
  background-color: #a855f7;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 90%;
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
}
.button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
