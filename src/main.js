import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';

router.afterEach((to) => {
  document.title = to.meta.title || 'Recomiéndame – Encuentra qué ver con IA'
})

createApp(App)
  .use(router)
  .mount('#app');