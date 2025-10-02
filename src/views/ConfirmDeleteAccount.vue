<template>
  <div class="landing">
    <div class="container glass card">
      <h1>Confirmar Eliminación</h1>
      <p v-if="loading">Procesando...</p>
      <div v-else>
        <p :class="ok ? 'msg success' : 'msg error'">{{ message }}</p>
        <router-link class="btn ghost" to="/">⬅ Volver al inicio</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '../config';

export default {
  name: 'ConfirmDeleteAccount',
  data: () => ({ loading: true, ok: false, message: '' }),
  async created() {
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
      this.message =
        e.response?.data?.message || 'No se pudo eliminar la cuenta';
      this.ok = false;
    } finally {
      this.loading = false;
    }
  }
};
</script>
