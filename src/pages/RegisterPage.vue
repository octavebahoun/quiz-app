<template>
  <div class="min-h-screen flex items-center justify-center bg-dark-blue-50">
    <div class="bg-dark-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-dark-blue-50 mb-6 text-center">Inscription</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-dark-blue-100 mb-1">Nom d'utilisateur</label>
          <input
            v-model="username"
            type="text"
            placeholder="Ton nom"
            class="w-full p-2 rounded border border-dark-blue-700 bg-dark-blue-800 text-dark-blue-50 focus:outline-none focus:ring-2 focus:ring-dark-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-dark-blue-100 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="exemple@email.com"
            class="w-full p-2 rounded border border-dark-blue-700 bg-dark-blue-800 text-dark-blue-50 focus:outline-none focus:ring-2 focus:ring-dark-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-dark-blue-100 mb-1">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full p-2 rounded border border-dark-blue-700 bg-dark-blue-800 text-dark-blue-50 focus:outline-none focus:ring-2 focus:ring-dark-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-dark-blue-500 hover:bg-dark-blue-400 text-dark-blue-50 py-2 px-4 rounded font-semibold transition-colors"
        >
          S'inscrire
        </button>
      </form>

      <p class="mt-4 text-dark-blue-100 text-center">
        Déjà un compte ?
        <router-link to="/login" class="text-dark-blue-400 hover:text-dark-blue-300 font-semibold">
          Connecte-toi
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')

const handleRegister = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('Utilisateur créé:', userCredential.user)
    alert(`Bienvenue ${username.value} ! Compte créé avec succès.`)
    router.push('/quiz') // redirige vers la page quiz
  } catch (error) {
    console.error('Erreur inscription:', error)
    alert(`Erreur : ${error.message}`)
  }
}
</script>
