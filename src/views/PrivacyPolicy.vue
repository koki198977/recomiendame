<template>
  <div class="page">
    <img src="@/assets/logo.png" alt="Recomiéndame" class="logo" />
    <h1>Políticas de Privacidad y Seguridad – Recomiéndame</h1>
    <p class="muted">Última actualización: 08-08-2025</p>

    <section>
      <h2>1. Recopilación de Información</h2>
      <ul>
        <li><strong>Datos de cuenta:</strong> Email y contraseña para autenticación.</li>
        <li><strong>Preferencias de usuario:</strong> Películas/series vistas, favoritos y lista de deseos.</li>
        <li><strong>Datos de uso:</strong> Estadísticas de actividad para mejorar recomendaciones.</li>
        <li><strong>Información técnica:</strong> Versión de la app y sistema operativo para soporte.</li>
      </ul>
    </section>

    <section>
      <h2>2. Uso de la Información</h2>
      <ul>
        <li>Proporcionar recomendaciones personalizadas.</li>
        <li>Mejorar la experiencia del usuario.</li>
        <li>Mantener la seguridad de la cuenta.</li>
        <li>Enviar notificaciones importantes sobre la app.</li>
      </ul>
    </section>

    <section>
      <h2>3. Almacenamiento y Seguridad</h2>
      <ul>
        <li><strong>Encriptación:</strong> Todos los datos se transmiten mediante HTTPS.</li>
        <li><strong>Almacenamiento local seguro:</strong> La información sensible se guarda de forma segura en el dispositivo.</li>
        <li><strong>Tokens de acceso:</strong> Usamos tokens JWT temporales para autenticación.</li>
        <li><strong>Eliminación automática:</strong> Los tokens expiran automáticamente.</li>
      </ul>
    </section>

    <section>
      <h2>4. Compartir Información</h2>
      <ul>
        <li><strong>No vendemos datos:</strong> Nunca vendemos o alquilamos información personal.</li>
        <li><strong>Proveedores de servicios:</strong> Compartimos datos solo con servicios esenciales (por ejemplo, TMDB para contenido).</li>
        <li><strong>Cumplimiento legal:</strong> Solo compartimos información cuando lo requiera la ley.</li>
      </ul>
    </section>

    <section>
      <h2>5. Derechos del Usuario</h2>
      <ul>
        <li><strong>Acceso:</strong> Puedes ver y descargar tus datos.</li>
        <li><strong>Corrección:</strong> Puedes actualizar tu información personal.</li>
        <li><strong>Eliminación:</strong> Puedes eliminar tu cuenta y todos tus datos.</li>
        <li><strong>Portabilidad:</strong> Puedes exportar tus datos.</li>
      </ul>
    </section>

    <section>
      <h2>6. Menores de Edad</h2>
      <ul>
        <li><strong>Restricción de edad:</strong> Recomiéndame no está dirigida a menores de 13 años.</li>
        <li><strong>Protección de menores:</strong> No recopilamos intencionalmente información de menores.</li>
        <li><strong>Aviso a padres:</strong> Si eres padre/madre y crees que tu hijo nos ha proporcionado información, contáctanos.</li>
      </ul>
    </section>

    <section>
      <h2>7. Cambios en las Políticas</h2>
      <ul>
        <li>Notificaremos cambios importantes por email.</li>
        <li>Las políticas actualizadas estarán disponibles en la app.</li>
        <li>El uso continuado de la app implica la aceptación de los cambios.</li>
      </ul>
    </section>

    <section>
      <h2>8. Contacto</h2>
      <p>Si tienes preguntas sobre privacidad o seguridad, contáctanos en:</p>
      <p>📧 <a href="mailto:recomiendameappcl@gmail.com">recomiendameappcl@gmail.com</a></p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.page {
  max-width: 860px;
  margin: 40px auto;
  padding: 24px;
  background: #0b0b0b;
  color: #fff;
  border-radius: 16px;
}
.logo {
  display: block;
  width: 120px;
  margin: 0 auto 16px;
}
h1 { font-size: 1.8rem; margin-bottom: 4px; }
.muted { color: #bbb; margin-bottom: 20px; }
section { margin: 18px 0; }
h2 { font-size: 1.2rem; margin: 12px 0; }
ul { padding-left: 18px; }
li { margin: 6px 0; }
a { color: #8ab4f8; text-decoration: underline; }
</style>
