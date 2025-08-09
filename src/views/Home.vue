<template>
  <div class="landing">
    <!-- Fondo -->
    <div class="bg-blur"></div>
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <!-- Hero -->
    <header class="hero container">
      <img src="@/assets/logo.png" alt="Recomiéndame" class="logo" />
      <h1>Encuentra qué ver <span class="ai-chip">con IA</span></h1>
      <p class="subtitle">
        Recomiéndame analiza tus gustos y te sugiere <strong>películas y series</strong> a tu medida.
        Marca lo visto, guarda favoritos y construye tu lista de deseos.
      </p>

      <div class="cta-row">
        <a
          class="btn primary"
          href="https://play.google.com/store/apps/details?id=tu.id.app"
          target="_blank" rel="noopener"
        >
          📥 Descargar en Google Play
        </a>

        <router-link class="btn ghost" to="/politicas-privacidad">
          Términos & Privacidad
        </router-link>
      </div>

      <!-- Aviso iOS -->
      <p class="coming-soon">📱 Disponible próximamente en iOS</p>

      <!-- Mockups reales (slider) -->
      <div class="mockups">
        <div class="phones track" ref="track" @wheel.passive>
          <figure class="phone">
            <div class="bezel">
              <img class="screen" src="@/assets/screens/recs.jpg" alt="Pantalla de recomendaciones" />
            </div>
            <figcaption>Recomendaciones</figcaption>
          </figure>

          <figure class="phone">
            <div class="bezel">
              <img class="screen" src="@/assets/screens/seen.jpg" alt="Vistos recientemente" />
            </div>
            <figcaption>Vistos recientemente</figcaption>
          </figure>

          <figure class="phone">
            <div class="bezel">
              <img class="screen" src="@/assets/screens/recs2.jpg" alt="Más recomendaciones" />
            </div>
            <figcaption>Favoritos / Acciones</figcaption>
          </figure>
        </div>

        <!-- Bullets -->
        <div class="bullets">
          <button
            v-for="(n, i) in 3"
            :key="i"
            class="dot"
            :class="{ active: i === current }"
            @click="goTo(i)"
            aria-label="Ir a captura"
          />
        </div>
      </div>
    </header>

    <!-- Cómo funciona -->
    <section class="container steps">
      <h2>¿Cómo funciona?</h2>
      <div class="grid">
        <article class="glass step">
          <div class="icon">🧠</div>
          <h3>Entiende tus gustos</h3>
          <p>La IA aprende de lo que viste, puntuaste y marcaste como favorito.</p>
        </article>
        <article class="glass step">
          <div class="icon">🔎</div>
          <h3>Busca lo ideal</h3>
          <p>Explora catálogos y plataformas para traerte lo que encaja contigo.</p>
        </article>
        <article class="glass step">
          <div class="icon">🎯</div>
          <h3>Te recomienda</h3>
          <p>Recibe listas explicadas y decide en segundos qué ver.</p>
        </article>
      </div>
    </section>

    <!-- CTA final -->
    <section class="container callout glass">
      <h2>¿Listo para tu próxima peli o serie?</h2>
      <p>Deja que la IA haga el trabajo. Tú solo disfruta.</p>
      <a
        class="btn primary"
        href="https://play.google.com/store/apps/details?id=tu.id.app"
        target="_blank" rel="noopener"
      >Descargar ahora</a>
    </section>

    <footer class="footer">
      <div class="container foot">
        <span>© 2025 Recomiéndame</span>
        <router-link to="/politicas-privacidad">Políticas de Privacidad</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return { current: 0 };
  },
  methods: {
    goTo(idx) {
      const el = this.$refs.track;
      if (!el) return;
      const card = el.children[idx];
      if (!card) return;
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      this.current = idx;
    },
    handleScroll() {
      const el = this.$refs.track;
      if (!el) return;
      const cards = [...el.children];
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      cards.forEach((c, i) => {
        const x = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(x - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      this.current = best;
    }
  },
  mounted() {
    const el = this.$refs.track;
    if (el) el.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  beforeUnmount() {
    const el = this.$refs.track;
    if (el) el.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
/* Base & fondo */
.container { max-width: 1120px; margin: 0 auto; padding: 0 20px; }
.landing { position: relative; min-height: 100vh; color: #fff;
  background: radial-gradient(1200px 600px at 10% 0%, #1b1f3a 0%, #0a0b12 60%, #07070c 100%);
  overflow: hidden;
}
.bg-blur { position: absolute; inset: -20%; filter: blur(60px); opacity: .35; pointer-events:none;
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

/* Hero */
.hero { text-align: center; padding: 80px 20px 10px; position: relative; }
.logo { width: 90px; margin: 0 auto 18px; filter: drop-shadow(0 6px 14px rgba(0,0,0,.35)); }
.hero h1 { font-size: clamp(28px, 4vw, 48px); font-weight: 800; letter-spacing: .3px; }
.ai-chip { background: linear-gradient(90deg,#00ffa3,#00c2ff); color:#0b0d16;
  padding: .15em .5em; border-radius: 999px; font-size:.8em; margin-left:.25em;
}
.subtitle { max-width: 800px; margin: 14px auto 24px; color: #cfd6ff; line-height: 1.6; }

.cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
.btn { padding: 12px 18px; border-radius: 12px; font-weight: 700; letter-spacing:.2px;
  backdrop-filter: blur(8px); transition: transform .1s ease, box-shadow .2s ease, background .2s;
  border: 1px solid rgba(255,255,255,.12); text-decoration: none; color: #fff;
}
.btn.primary { background: linear-gradient(135deg,#00ffa3 0%,#00c2ff 100%); color:#04121a; box-shadow: 0 10px 28px rgba(0, 194, 255, .25); }
.btn.primary:hover { transform: translateY(-1px); box-shadow: 0 14px 36px rgba(0, 194, 255, .35); }
.btn.ghost { background: rgba(255,255,255,.06); }
.btn.ghost:hover { background: rgba(255,255,255,.12); transform: translateY(-1px); }

/* Aviso iOS */
.coming-soon {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #cfd6ff;
  opacity: 0.85;
  text-align: center;
}

/* Mockups reales */
.mockups { margin-top: 36px; }
.phones {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(260px, 340px);
  gap: 28px;
  justify-content: center;
  padding: 10px 8px 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.phones::-webkit-scrollbar { height: 8px; }
.phones::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 999px; }

.phone { scroll-snap-align: center; text-align: center; color: #cfd6ff; }
.phone figcaption { margin-top: 10px; font-size: 14px; opacity: .9; }

.bezel {
  position: relative;
  width: 100%;
  aspect-ratio: 9/19.5;
  border-radius: 34px;
  padding: 10px;
  background: linear-gradient(180deg,#171a2b,#0f1120);
  box-shadow:
    inset 0 0 0 2px rgba(255,255,255,.06),
    0 20px 60px rgba(0,0,0,.45);
  overflow: hidden;
}
.bezel::before {
  content:"";
  position:absolute;
  top:8px; left:50%; transform:translateX(-50%);
  width: 30%;
  height: 14px;
  background: #0f1120;
  border-radius: 0 0 12px 12px;
  z-index: 2;
}
.screen {
  position: absolute; inset: 10px;
  width: calc(100% - 20px); height: calc(100% - 20px);
  object-fit: cover; border-radius: 26px;
  border: 1px solid rgba(255,255,255,.06);
}

/* Bullets */
.bullets { display:flex; gap:8px; justify-content:center; margin:14px 0 0; }
.dot { width:10px; height:10px; border-radius:50%; border:1px solid rgba(255,255,255,.35);
  background: transparent; cursor:pointer;
}
.dot.active { background: #00c2ff; border-color: #00c2ff; }

/* Secciones */
h2 { font-size: clamp(22px, 2.6vw, 32px); margin: 10px 0 18px; text-align:center; }
.grid { display:grid; gap:16px; grid-template-columns: repeat(3,1fr); }
@media (max-width: 900px) { .grid { grid-template-columns: 1fr 1fr } }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr } }

.glass { background: rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.10);
  border-radius: 18px; box-shadow: 0 10px 28px rgba(0,0,0,.25); backdrop-filter: blur(10px);
}
.steps .step { padding: 18px; }
.step .icon { font-size: 28px; margin-bottom: 8px; }

.callout { text-align:center; padding: 28px; margin: 28px auto; }

/* Footer */
.footer { padding: 22px 0 36px; color:#b8c0ff80; }
.foot { display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,.08); padding-top:14px; }
.foot a { color: #b8c0ff; text-decoration: none; }
.foot a:hover { text-decoration: underline; }
</style>
