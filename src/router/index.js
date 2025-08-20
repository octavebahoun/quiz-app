import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import Accueil from '../pages/AccueilPage.vue'
import Register from '../pages/RegisterPage.vue'
import Login from '../pages/LoginPage.vue'
import Quiz from '../pages/QuizPage.vue'
import UserProfile from '../pages/UserProfile.vue'
import Apropos from '../pages/AproposPage.vue'
import Classement from '../pages/ClassementPage.vue'

const routes = [
  { path: '/', redirect: '/accueil' },
  { path: '/accueil', component: Accueil },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/quiz', component: Quiz },
  { path: '/user-profile', component: UserProfile },
  { path: '/apropos', component: Apropos },
  { path: '/classement', component: Classement },

  // Routes pour les pages de quiz thématiques
  { path: '/quiz/anime', component: () => import('../pages/AnimePage.vue') },
  { path: '/quiz/chansons', component: () => import('../pages/ChansonsPage.vue') },
  { path: '/quiz/culture-generale', component: () => import('../pages/CultureGenerale.vue') },
  { path: '/quiz/geographie', component: () => import('../pages/GeographiePage.vue') },
  { path: '/quiz/histoire', component: () => import('../pages/HistoirePage.vue') },
  { path: '/quiz/mathematiques', component: () => import('../pages/MathematiquesPage.vue') },
  { path: '/quiz/physique', component: () => import('../pages/PhysiquePage.vue') },
  { path: '/quiz/programmation', component: () => import('../pages/ProgrammationPage.vue') },
  { path: '/quiz/technologie', component: () => import('../pages/TechnologiePage.vue') },
  { path: '/quiz/web', component: () => import('../pages/WebPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/user-profile' && !auth.currentUser) {
    return next('/login')
  }
  next()
})

export default router
