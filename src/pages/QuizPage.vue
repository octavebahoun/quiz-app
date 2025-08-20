<template>
  <BaseTemplate>
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-white mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            Choisis ton quiz
          </span>
        </h1>
        <p class="text-purple-200 text-xl">Sélectionne une catégorie pour commencer ton aventure quiz !</p>
      </div>

      <!-- Quiz Categories Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="theme in themes" :key="theme.name"
          class="group cursor-pointer transform transition-all duration-300 hover:scale-105">
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 
                      group-hover:bg-white/20 transition-all duration-300">
            <div class="text-center">
              <div class="text-5xl mb-4">{{ theme.icon }}</div>
              <h3 class="text-xl font-bold text-white mb-2">{{ theme.name }}</h3>
              <p class="text-purple-200 text-sm mb-4">{{ theme.description }}</p>
              <button @click="goToQuiz(theme)" class="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white 
                             font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-600 
                             transition-all duration-200">
                Commencer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="mt-16">
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 text-center">
            <div class="text-3xl font-bold text-white">{{ themes.length }}</div>
            <div class="text-purple-200">Catégories</div>
          </div>
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 text-center">
            <div class="text-3xl font-bold text-white">1000+</div>
            <div class="text-purple-200">Questions</div>
          </div>
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 text-center">
            <div class="text-3xl font-bold text-white">∞</div>
            <div class="text-purple-200">Fun</div>
          </div>
        </div>
      </div>
    </div>
  </BaseTemplate>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseTemplate from '@/templates/BaseTemplate.vue'

const router = useRouter()

const themes = [
  {
    name: 'Culture Générale',
    url: 'culture-generale',
    icon: '🌍',
    description: 'Testez votre culture générale',
    color: 'from-blue-500 to-purple-500'
  },
  {
    name: 'Chansons',
    url: 'chansons',
    icon: '🎵',
    description: 'Musique et chansons populaires',
    color: 'from-pink-500 to-red-500'
  },
  {
    name: 'Anime',
    url: 'anime',
    icon: '🎌',
    description: 'Univers des animes et mangas',
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Mathématiques',
    url: 'mathematiques',
    icon: '🔢',
    description: 'Défis mathématiques',
    color: 'from-green-500 to-blue-500'
  },
  {
    name: 'Physique',
    url: 'physique',
    icon: '⚛️',
    description: 'Lois et phénomènes physiques',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    name: 'Programmation',
    url: 'programmation',
    icon: '💻',
    description: 'Langages et concepts de code',
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Web',
    url: 'web',
    icon: '🌐',
    description: 'Technologies web modernes',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    name: 'Histoire',
    url: 'histoire',
    icon: '📚',
    description: 'Événements historiques',
    color: 'from-amber-500 to-orange-500'
  },
  {
    name: 'Géographie',
    url: 'geographie',
    icon: '🗺️',
    description: 'Pays, capitales et cartes',
    color: 'from-green-500 to-teal-500'
  },
  {
    name: 'Technologie',
    url: 'technologie',
    icon: '📱',
    description: 'Innovations technologiques',
    color: 'from-gray-500 to-blue-500'
  },
]

const goToQuiz = (theme) => {
  router.push(`/quiz/${encodeURIComponent(theme.url)}`)
}
</script>
