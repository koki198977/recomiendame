import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import EmailConfirmed from '../views/EmailConfirmed.vue';
import ResetPassword from '../views/ResetPassword.vue';
import PrivacyPolicy from '../views/PrivacyPolicy.vue';
import DeleteAccount from '../views/DeleteAccount.vue';
import ConfirmDeleteAccount from '../views/ConfirmDeleteAccount.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/email-confirmed', name: 'EmailConfirmed', component: EmailConfirmed },
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
  { path: '/politicas-privacidad', name: 'PrivacyPolicy', component: PrivacyPolicy },
  { path: '/delete-account', name: 'DeleteAccount', component: DeleteAccount },
  { path: '/delete-account/confirm', name: 'ConfirmDeleteAccount', component: ConfirmDeleteAccount },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router