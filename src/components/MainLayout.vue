<template>
  <!-- Navbar -->
  <header class="w-full bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-600 shadow-lg fixed top-0 z-30 ">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">

      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <img src="#" alt="QuizAnime" class="w-10 h-10 rounded-full shadow-md" />
        <h1 class="text-2xl font-bold text-white tracking-wide">QuizAnime</h1>
      </div>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex space-x-8">
        <router-link to="/" class="text-white font-medium hover:text-yellow-300 transition">Accueil</router-link>
        <router-link to="/quiz" class="text-white font-medium hover:text-yellow-300 transition">Quiz</router-link>
        <router-link to="/classement"
          class="text-white font-medium hover:text-yellow-300 transition">Classement</router-link>
        <router-link to="/apropos" class="text-white font-medium hover:text-yellow-300 transition">À
          propos</router-link>
      </nav>

      <!-- Right side: Login/Profile -->
      <div class="flex items-center space-x-4">
        <button @click="toggleTheme" class="text-white hover:text-yellow-300 transition">
          <i class="fas fa-moon"></i>
        </button>

        <router-link v-if="!user" to="/login"
          class="px-5 py-2 bg-yellow-400 text-black rounded-full font-semibold shadow hover:bg-yellow-300 transition">
          Connexion
        </router-link>

        <router-link v-else to="/user-profile"
          class="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow hover:bg-gray-200 transition">
          <img :src="userPhoto" class="w-8 h-8 rounded-full" />
          <span class="font-medium text-gray-800">{{ user.displayName || "Profil" }}</span>
        </router-link>

      </div>

      <!-- Mobile Menu Button -->
      <button @click="menuOpen = !menuOpen" class="md:hidden text-white text-2xl">
        <i class="fas fa-bars"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="menuOpen" class="md:hidden bg-indigo-700 px-6 py-4 space-y-3">
      <router-link to="/" class="block text-white font-medium hover:text-yellow-300">Accueil</router-link>
      <router-link to="/quiz" class="block text-white font-medium hover:text-yellow-300">Quiz</router-link>
      <router-link to="/classement" class="block text-white font-medium hover:text-yellow-300">Classement</router-link>
      <router-link to="/apropos" class="block text-white font-medium hover:text-yellow-300">À propos</router-link>
    </div>
  </header>

  <!-- Main Content Slot -->

  <main class="pt-20">
    <BaseTemplate>
      <slot></slot>
    </BaseTemplate>
  </main>

  <!-- Footer -->
  <footer class="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 text-white py-10">
    <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h4 class="text-lg font-bold mb-3">Resources</h4>
        <ul class="space-y-2">
          <li><a href="#" class="hover:text-yellow-300 transition">Contact</a></li>
          <li><a href="#" class="hover:text-yellow-300 transition">Support</a></li>
          <li><a href="#" class="hover:text-yellow-300 transition">Documentation</a></li>
          <li><a href="#" class="hover:text-yellow-300 transition">Pricing</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-lg font-bold mb-3">About</h4>
        <ul class="space-y-2">
          <li><a href="#" class="hover:text-yellow-300 transition">Terms</a></li>
          <li><a href="#" class="hover:text-yellow-300 transition">License</a></li>
          <li><a href="#" class="hover:text-yellow-300 transition">Privacy</a></li>
          <li><a href="#" class="hover:text-yellow-300 transition">About Us</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-lg font-bold mb-3">Explore</h4>
        <ul class="space-y-2">
          <li><a href="#" class="hover:text-yellow-300 transition">Showcase</a></li>
          <li><a href="#" class="hover:text-yellow-300 transition">Roadmap</a></li>
          <li><a href="#" class="hover:text-yellow-300 transition">Languages</a></li>
          <li><a href="#" class="hover:text-yellow-300 transition">Blog</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-lg font-bold mb-3">Company</h4>
        <ul class="space-y-2">
          <li><a href="#" class="hover:text-yellow-300 transition">Partners</a></li>
          <li><a href="#" class="hover:text-yellow-300 transition">Team</a></li>
          <li><a href="#" class="hover:text-yellow-300 transition">Careers</a></li>
        </ul>
      </div>
    </div>
    <div class="mt-10 border-t border-white/30 pt-6 text-center text-gray-200">
      © 2025 QuizAnime. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { auth, db } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";
import BaseTemplate from "@/templates/BaseTemplate.vue";

const user = ref(null);
const userPhoto = ref('/default-avatar.png');
const menuOpen = ref(false);

let unsubscribe = null
onMounted(() => {
  unsubscribe = onAuthStateChanged(auth, async (u) => {
    user.value = u;
    if (u) {
      const docRef = doc(db, 'users', u.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.photoURL) userPhoto.value = data.photoURL;
      }
    }
  });
});

onUnmounted(() => {
  if (typeof unsubscribe === 'function') unsubscribe()
})

function toggleTheme() {
  document.documentElement.classList.toggle("dark")
}
</script>

<style scoped>
header,
footer {
  font-family: 'Poppins', sans-serif;
}
</style>
