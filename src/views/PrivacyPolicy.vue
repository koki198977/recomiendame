<template>
  <div class="landing">
    <!-- Fondo -->
    <div class="bg-blur"></div>
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <div class="container glass card">
      <img src="@/assets/logo.png" alt="Recomiéndame" class="logo" />
      <h1>Políticas de Privacidad y Seguridad – Recomiéndame</h1>
      <p class="muted">Última actualización: 08-08-2025</p>

      <!-- Índice rápido -->
      <nav class="toc">
        <button v-for="(s, i) in sections" :key="s.id"
                class="chip" @click="open(i)">
          {{ i+1 }}. {{ s.title }}
        </button>
      </nav>

      <!-- Acordeón -->
      <div class="accordion">
        <details v-for="(s, i) in sections" :key="s.id"
                 :open="i === openIndex" @toggle="syncOpen(i, $event)"
                 class="panel">
          <summary class="summary">
            <span class="num">{{ i + 1 }}</span>
            <h2>{{ s.title }}</h2>
            <span class="chev" aria-hidden="true">▾</span>
          </summary>

          <div class="content" :id="s.id">
            <ul v-if="s.items">
              <li v-for="(it, k) in s.items" :key="k" v-html="it"></li>
            </ul>
            <p v-else v-html="s.body"></p>
          </div>
        </details>
      </div>

      <div class="btn-row">
        <router-link class="btn primary" to="/">⬅ Volver al inicio</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      openIndex: 0,
      sections: [
        {
          id: 'recopilacion',
          title: 'Recopilación de Información',
          items: [
            '<strong>Datos de cuenta:</strong> Email y contraseña para autenticación.',
            '<strong>Preferencias de usuario:</strong> Películas/series vistas, favoritos y lista de deseos.',
            '<strong>Datos de uso:</strong> Estadísticas de actividad para mejorar recomendaciones.',
            '<strong>Información técnica:</strong> Versión de la app y sistema operativo para soporte.'
          ]
        },
        {
          id: 'uso',
          title: 'Uso de la Información',
          items: [
            'Proporcionar recomendaciones personalizadas.',
            'Mejorar la experiencia del usuario.',
            'Mantener la seguridad de la cuenta.',
            'Enviar notificaciones importantes sobre la app.'
          ]
        },
        {
          id: 'seguridad',
          title: 'Almacenamiento y Seguridad',
          items: [
            '<strong>Encriptación:</strong> Todos los datos se transmiten mediante HTTPS.',
            '<strong>Almacenamiento local seguro:</strong> La información sensible se guarda de forma segura en el dispositivo.',
            '<strong>Tokens de acceso:</strong> Usamos tokens JWT temporales para autenticación.',
            '<strong>Eliminación automática:</strong> Los tokens expiran automáticamente.'
          ]
        },
        {
          id: 'compartir',
          title: 'Compartir Información',
          items: [
            '<strong>No vendemos datos:</strong> Nunca vendemos o alquilamos información personal.',
            '<strong>Proveedores de servicios:</strong> Compartimos datos solo con servicios esenciales (por ejemplo, TMDB para contenido).',
            '<strong>Cumplimiento legal:</strong> Solo compartimos información cuando lo requiera la ley.'
          ]
        },
        {
          id: 'derechos',
          title: 'Derechos del Usuario',
          items: [
            '<strong>Acceso:</strong> Puedes ver y descargar tus datos.',
            '<strong>Corrección:</strong> Puedes actualizar tu información personal.',
            '<strong>Eliminación:</strong> Puedes eliminar tu cuenta y todos tus datos.',
            '<strong>Portabilidad:</strong> Puedes exportar tus datos.'
          ]
        },
        {
          id: 'menores',
          title: 'Menores de Edad',
          items: [
            '<strong>Restricción de edad:</strong> Recomiéndame no está dirigida a menores de 13 años.',
            '<strong>Protección de menores:</strong> No recopilamos intencionalmente información de menores.',
            '<strong>Aviso a padres:</strong> Si eres padre/madre y crees que tu hijo nos ha proporcionado información, contáctanos.'
          ]
        },
        {
          id: 'cambios',
          title: 'Cambios en las Políticas',
          items: [
            'Notificaremos cambios importantes por email.',
            'Las políticas actualizadas estarán disponibles en la app.',
            'El uso continuado de la app implica la aceptación de los cambios.'
          ]
        },
        {
          id: 'contacto',
          title: 'Contacto',
          body:
            'Si tienes preguntas sobre privacidad o seguridad, contáctanos en: <br/> 📧 <a href="mailto:recomiendameappcl@gmail.com">recomiendameappcl@gmail.com</a>'
        }
      ]
    };
  },
  methods: {
    open(i) {
      this.openIndex = i;
      // Desplaza suavemente al panel
      this.$nextTick(() => {
        const panels = this.$el.querySelectorAll('.panel');
        panels[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    syncOpen(i, ev) {
      if (ev.target.open) this.openIndex = i;
    }
  },
  mounted() { window.scrollTo(0, 0); }
};
</script>

<style scoped>
/* Fondo estilo Home */
.landing {
  position: relative; min-height: 100vh; color: #fff;
  background: radial-gradient(1200px 600px at 10% 0%, #1b1f3a 0%, #0a0b12 60%, #07070c 100%);
  overflow: hidden;
}
.bg-blur {
  position: absolute; inset: -20%; filter: blur(60px); opacity: .35; pointer-events:none;
  background:
    radial-gradient(600px 400px at 80% 10%, #7c4dff 0%, transparent 60%),
    radial-gradient(500px 300px at 15% 30%, #00d4ff 0%, transparent 60%),
    radial-gradient(700px 500px at 70% 80%, #00ffa3 0%, transparent 65%);
}
.bg-blob { position: absolute; width: 420px; height: 420px; border-radius: 50%;
  filter: blur(40px); opacity: .18; pointer-events:none; mix-blend-mode: screen;
  animation: float 14s ease-in-out infinite;
}
.blob-1 { left: -120px; top: 120px; background: #6a5acd; }
.blob-2 { right: -140px; top: 40px; background: #00c2ff; animation-delay: 5s; }
@keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(30px) } }

/* Card contenedora */
.container { max-width: 1120px; margin: 0 auto; padding: 20px; }
.glass.card {
  background: rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.10);
  border-radius: 18px;
  box-shadow: 0 10px 28px rgba(0,0,0,.25);
  backdrop-filter: blur(10px);
  padding: 24px;
  position: relative;
  z-index: 2;
}
.logo { display: block; width: 120px; margin: 0 auto 16px; }
h1 { font-size: 1.8rem; margin-bottom: 4px; text-align: center; }
.muted { color: #bbb; margin-bottom: 20px; text-align: center; }

/* Índice */
.toc {
  display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin: 6px 0 18px;
}
.chip {
  background: rgba(255,255,255,.08); color:#e6ebff; border:1px solid rgba(255,255,255,.12);
  padding: 8px 12px; border-radius: 999px; cursor: pointer; font-weight: 600; font-size:.9rem;
}
.chip:hover { background: rgba(255,255,255,.14); }

/* Acordeón */
.accordion { max-width: 900px; margin: 0 auto; }
.panel {
  background: rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.10);
  border-radius: 14px;
  margin: 10px 0;
  overflow: hidden;
}
.summary {
  list-style: none; display:flex; align-items:center; gap:10px;
  padding: 14px 16px; cursor: pointer; user-select: none;
}
.panel > summary::-webkit-details-marker { display: none; }
.num {
  width: 30px; height: 30px; border-radius: 50%;
  display:grid; place-items:center; font-weight:800; color:#04121a;
  background: linear-gradient(135deg,#00ffa3,#00c2ff);
}
.summary h2 {
  font-size: 1.05rem; margin: 0; flex:1; color:#fff;
}
.chev { transition: transform .25s ease; opacity: .85; }
.panel[open] .chev { transform: rotate(180deg); }

.content { padding: 0 16px 14px 58px; color:#e6ebff; }
.content ul { margin: 10px 0 0; padding-left: 16px; }
.content li { margin: 6px 0; }
::v-deep(.content a) {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: underline;
  transition: color 0.2s ease;
}

::v-deep(.content a:hover) {
  color: #00ffa3;
}

/* Botón volver */
.btn-row { text-align: center; margin-top: 24px; }
.btn {
  display: inline-block; padding: 12px 18px; border-radius: 12px; font-weight: 700; letter-spacing:.2px;
  backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.12); text-decoration: none; color: #fff;
}
.btn.primary {
  background: linear-gradient(135deg,#00ffa3 0%,#00c2ff 100%); color:#04121a; box-shadow: 0 10px 28px rgba(0, 194, 255, .25);
}
.btn.primary:hover { transform: translateY(-1px); box-shadow: 0 14px 36px rgba(0, 194, 255, .35); }
</style>
