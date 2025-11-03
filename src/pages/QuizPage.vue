<template>
  <BaseTemplate>
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold mb-4 bg-clip-text text-transparent" 
            style="background-image: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));">
          Choisis ton quiz
        </h1>
        <p class="text-(--text-secondary) text-xl">Sélectionne une catégorie pour commencer ton aventure quiz !</p>
      </div>

      <!-- Quiz Categories Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="theme in themes" :key="theme.name"
          class="group cursor-pointer transform transition-all duration-300 hover:scale-105">
          <div class="bg-(--bg-surface) rounded-2xl p-6 shadow-lg border border-(--border-color) hover:shadow-xl hover:border-(--color-accent-primary) transition-all duration-300">
            <div class="text-center">
              <div class="mb-4 flex justify-center">
                <component :is="theme.icon" :size="48" :stroke-width="1.5" class="text-(--color-accent-primary)" />
              </div>
              <h3 class="text-xl font-bold text-(--text-primary) mb-2">{{ theme.name }}</h3>
              <p class="text-(--text-secondary) text-sm mb-4">{{ theme.description }}</p>
              <button @click="goToQuiz(theme)" 
                class="w-full py-2 px-4 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 hover:transform hover:translate-y-[-2px] transition-all duration-200"
                style="background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));">
                Commencer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="mt-16">
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-(--bg-surface) rounded-2xl p-6 shadow-lg border border-(--border-color) text-center hover:border-(--color-accent-primary) transition-all">
            <div class="text-3xl font-bold text-(--color-accent-primary)">{{ themes.length }}</div>
            <div class="text-(--text-secondary)">Catégories</div>
          </div>
          <div class="bg-(--bg-surface) rounded-2xl p-6 shadow-lg border border-(--border-color) text-center hover:border-(--color-accent-secondary) transition-all">
            <div class="text-3xl font-bold text-(--color-accent-secondary)">1000+</div>
            <div class="text-(--text-secondary)">Questions</div>
          </div>
          <div class="bg-(--bg-surface) rounded-2xl p-6 shadow-lg border border-(--border-color) text-center hover:border-(--color-accent-primary) transition-all">
            <div class="text-3xl font-bold bg-clip-text text-transparent" 
                 style="background-image: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));">∞</div>
            <div class="text-(--text-secondary)">Fun</div>
          </div>
        </div>
      </div>
    </div>
  </BaseTemplate>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseTemplate from '@/templates/BaseTemplate.vue'
import { Globe, Music, Tv, Calculator, Atom, Code, Scroll, Map, Wrench, Globe2 } from 'lucide-vue-next'

const router = useRouter()

const themes = [
  {
    name: 'Culture Générale',
    url: 'culture-generale',
    icon: Globe,
    description: 'Testez votre culture générale',
  },
  {
    name: 'Chansons',
    url: 'chansons',
    icon: Music,
    description: 'Musique et chansons populaires',
  },
  {
    name: 'Anime',
    url: 'anime',
    icon: Tv,
    description: 'Univers des animes et mangas',
  },
  {
    name: 'Mathématiques',
    url: 'mathematiques',
    icon: Calculator,
    description: 'Défis mathématiques',
  },
  {
    name: 'Physique',
    url: 'physique',
    icon: Atom,
    description: 'Lois et phénomènes physiques',
  },
  {
    name: 'Programmation',
    url: 'programmation',
    icon: Code,
    description: 'Langages et concepts de programmation',
  },
  {
    name: 'Histoire',
    url: 'histoire',
    icon: Scroll,
    description: 'Événements historiques',
  },
  {
    name: 'Géographie',
    url: 'geographie',
    icon: Map,
    description: 'Pays, capitales et continents',
  },
  {
    name: 'Technologie',
    url: 'technologie',
    icon: Wrench,
    description: 'Innovations et gadgets',
  },
  {
    name: 'Web',
    url: 'web',
    icon: Globe2,
    description: 'Technologies web modernes',
  },
]

function goToQuiz(theme) {
  router.push(`/quiz/${theme.url}`)
}
</script>