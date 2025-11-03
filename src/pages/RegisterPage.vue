<template>
  <div class="min-h-screen flex items-center justify-center bg-(--bg-primary) py-12 px-4">
    <div class="bg-(--bg-surface) p-8 rounded-2xl shadow-lg border border-(--border-color) w-full max-w-md">
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
             style="background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));">
          <Target :size="32" class="text-white" />
        </div>
        <h2 class="text-3xl font-bold bg-clip-text text-transparent" 
            style="background-image: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));">Inscription</h2>
        <p class="text-(--text-secondary) mt-2">Créez votre compte pour commencer</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-(--text-primary) font-medium mb-2">Nom d'utilisateur</label>
          <input
            v-model="username"
            type="text"
            placeholder="Ton nom"
            class="w-full p-3 rounded-lg bg-(--bg-interactive) text-(--text-primary) border border-(--border-color) focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-all"
            required
          />
        </div>

        <div>
          <label class="block text-(--text-primary) font-medium mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="exemple@email.com"
            class="w-full p-3 rounded-lg bg-(--bg-interactive) text-(--text-primary) border border-(--border-color) focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-all"
            required
          />
        </div>

        <div>
          <label class="block text-(--text-primary) font-medium mb-2">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full p-3 rounded-lg bg-(--bg-interactive) text-(--text-primary) border border-(--border-color) focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-all"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-lg hover:opacity-90 hover:transform hover:translate-y-[-2px]"
          style="background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));"
        >
          S'inscrire
        </button>
      </form>

      <p class="mt-6 text-(--text-secondary) text-center">
        Déjà un compte ?
        <router-link to="/login" class="font-semibold bg-clip-text text-transparent hover:opacity-80 transition"
                     style="background-image: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));">
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
import { Target } from 'lucide-vue-next'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')

const handleRegister = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('Utilisateur créé:', userCredential.user)
    alert(`Bienvenue ${username.value} ! Compte créé avec succès.`)
    router.push('/quiz')
  } catch (error) {
    console.error('Erreur inscription:', error)
    alert(`Erreur : ${error.message}`)
  }
}
</script>