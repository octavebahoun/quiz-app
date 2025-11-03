<template>
  <!-- Navbar avec gradient -->
  <header class="w-full shadow-lg fixed top-0 z-30" style="background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">

      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-md">
          <Target :size="24" class="text-white" />
        </div>
        <h1 class="text-2xl font-bold text-white tracking-wide">QuizApp</h1>
      </div>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex space-x-8">
        <router-link to="/" class="text-white font-medium hover:text-white/80 transition">Accueil</router-link>
        <router-link to="/quiz" class="text-white font-medium hover:text-white/80 transition">Quiz</router-link>
        <router-link to="/classement" class="text-white font-medium hover:text-white/80 transition">Classement</router-link>
        <router-link to="/apropos" class="text-white font-medium hover:text-white/80 transition">À propos</router-link>
      </nav>

      <!-- Right side: Theme Toggle & Login/Profile -->
      <div class="flex items-center space-x-4">
        <button 
          @click="toggleTheme" 
          class="text-white hover:bg-white/10 transition p-2 rounded-full"
          :title="isDark ? 'Mode clair' : 'Mode sombre'"
        >
          <Sun v-if="isDark" :size="20" />
          <Moon v-else :size="20" />
        </button>

        <router-link v-if="!user" to="/login"
          class="px-5 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold shadow hover:bg-white/30 transition">
          Connexion
        </router-link>

        <router-link v-else to="/user-profile"
          class="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full shadow hover:bg-white/30 transition">
          <img :src="userPhoto" class="w-8 h-8 rounded-full" />
          <span class="font-medium text-white">{{ user.displayName || "Profil" }}</span>
        </router-link>

      </div>

      <!-- Mobile Menu Button -->
      <button 
        @click="menuOpen = !menuOpen" 
        class="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all relative z-50"
        :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
      >
        <Menu v-if="!menuOpen" :size="24" class="transition-transform duration-300" />
        <X v-else :size="24" class="transition-transform duration-300" />
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="menuOpen"
        @click="menuOpen = false"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
      ></div>
    </transition>

    <!-- Mobile Menu Sidebar -->
    <transition
      enter-active-class="transition-transform duration-300"
      leave-active-class="transition-transform duration-300"
      enter-from-class="translate-x-full"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="menuOpen"
        class="fixed top-0 right-0 h-full w-64 bg-(--bg-surface) shadow-2xl z-50 md:hidden overflow-y-auto"
      >
        <div class="p-6">
          <!-- Close button -->
          <button 
            @click="menuOpen = false"
            class="absolute top-4 right-4 text-(--text-primary) p-2 rounded-lg hover:bg-(--bg-interactive) transition-all"
          >
            <X :size="24" />
          </button>

          <!-- Logo -->
          <div class="flex items-center space-x-3 mb-8 mt-4">
            <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                 style="background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));">
              <Target :size="24" class="text-white" />
            </div>
            <h2 class="text-xl font-bold text-(--text-primary)">QuizApp</h2>
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-2">
            <router-link 
              to="/" 
              @click="menuOpen = false"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg text-(--text-primary) font-medium hover:bg-(--bg-interactive) transition-all"
            >
              <Home :size="20" />
              <span>Accueil</span>
            </router-link>
            <router-link 
              to="/quiz" 
              @click="menuOpen = false"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg text-(--text-primary) font-medium hover:bg-(--bg-interactive) transition-all"
            >
              <Target :size="20" />
              <span>Quiz</span>
            </router-link>
            <router-link 
              to="/classement" 
              @click="menuOpen = false"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg text-(--text-primary) font-medium hover:bg-(--bg-interactive) transition-all"
            >
              <Trophy :size="20" />
              <span>Classement</span>
            </router-link>
            <router-link 
              to="/apropos" 
              @click="menuOpen = false"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg text-(--text-primary) font-medium hover:bg-(--bg-interactive) transition-all"
            >
              <Info :size="20" />
              <span>À propos</span>
            </router-link>
          </nav>

          <!-- Divider -->
          <div class="my-6 border-t border-(--border-color)"></div>

          <!-- User Section -->
          <div v-if="!user" class="space-y-2">
            <router-link
              to="/login"
              @click="menuOpen = false"
              class="flex items-center justify-center px-4 py-3 rounded-lg text-white font-semibold shadow-lg hover:opacity-90 transition-all"
              style="background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));"
            >
              Connexion
            </router-link>
            <router-link
              to="/register"
              @click="menuOpen = false"
              class="flex items-center justify-center px-4 py-3 rounded-lg text-(--text-primary) font-semibold border border-(--border-color) hover:border-(--color-accent-primary) transition-all"
            >
              Inscription
            </router-link>
          </div>
          <div v-else>
            <router-link
              to="/user-profile"
              @click="menuOpen = false"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg bg-(--bg-interactive) hover:bg-(--border-color) transition-all"
            >
              <img :src="userPhoto" class="w-10 h-10 rounded-full" />
              <div>
                <div class="font-semibold text-(--text-primary)">{{ user.displayName || "Mon Profil" }}</div>
                <div class="text-sm text-(--text-secondary)">{{ user.email }}</div>
              </div>
            </router-link>
          </div>

          <!-- Theme Toggle -->
          <div class="mt-6">
            <button 
              @click="toggleTheme" 
              class="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-(--bg-interactive) hover:bg-(--border-color) transition-all"
            >
              <span class="text-(--text-primary) font-medium">Thème</span>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-(--text-secondary)">{{ isDark ? 'Sombre' : 'Clair' }}</span>
                <Moon v-if="isDark" :size="18" class="text-(--color-accent-primary)" />
                <Sun v-else :size="18" class="text-(--color-accent-secondary)" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </header>

  <!-- Main Content Slot -->
  <main class="pt-16">
    <BaseTemplate>
      <slot></slot>
    </BaseTemplate>
  </main>

  <!-- Footer -->
  <footer class="bg-(--bg-surface) border-t border-(--border-color) text-(--text-primary) py-10">
    <div class="mt-10 border-t border-(--border-color) pt-6 text-center text-(--text-muted)">
      © 2025 QuizApp. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { auth, db } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import BaseTemplate from "@/templates/BaseTemplate.vue"
import { useTheme } from "@/composables/useTheme"
import { Target, Home, Trophy, Info, Sun, Moon, Menu, X } from 'lucide-vue-next'

const user = ref(null)
const userPhoto = ref('/default-avatar.png')
const menuOpen = ref(false)

const { isDark, toggleTheme } = useTheme()

let unsubscribe = null
onMounted(() => {
  unsubscribe = onAuthStateChanged(auth, async (u) => {
    user.value = u
    if (u) {
      const docRef = doc(db, 'users', u.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.photoURL) userPhoto.value = data.photoURL
      }
    }
  })
})

onUnmounted(() => {
  if (typeof unsubscribe === 'function') unsubscribe()
})
</script>

<style scoped>
header,
footer {
  font-family: 'Inter', 'Segoe UI', sans-serif;
}
</style>
