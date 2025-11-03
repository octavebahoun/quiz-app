<template>
  <div>
    <header class="text-center py-16">
      <h1 class="text-5xl font-bold mb-4 bg-clip-text text-transparent" 
          style="background-image: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));">
        Bienvenue sur QuizApp
      </h1>
      <p class="text-(--text-secondary) text-xl">Testez vos connaissances avec nos quiz interactifs !</p>
    </header>

    <div class="max-w-4xl mx-auto">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <div class="bg-(--bg-surface) rounded-2xl p-8 shadow-lg border border-(--border-color)">
          <h2 class="text-3xl font-bold text-(--text-primary) mb-4">Prêt à relever le défi ?</h2>
          <p class="text-(--text-secondary) text-lg mb-6">
            Explorez différentes catégories et testez vos connaissances avec nos quiz interactifs et amusants.
          </p>
          <router-link to="/quiz"
            class="inline-block px-8 py-4 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transform hover:scale-105 transition-all duration-200"
            style="background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));">
            Commencer maintenant
          </router-link>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-(--bg-surface) rounded-2xl p-6 shadow-lg border border-(--border-color) text-center hover:shadow-xl transition-all">
          <div class="flex justify-center mb-4">
            <Target :size="40" :stroke-width="1.5" class="text-(--color-accent-primary)" />
          </div>
          <h3 class="text-xl font-bold text-(--text-primary) mb-2">Quiz variés</h3>
          <p class="text-(--text-secondary)">Plus de 10 catégories différentes</p>
        </div>

        <div class="bg-(--bg-surface) rounded-2xl p-6 shadow-lg border border-(--border-color) text-center hover:shadow-xl transition-all">
          <div class="flex justify-center mb-4">
            <Zap :size="40" :stroke-width="1.5" class="text-(--color-accent-secondary)" />
          </div>
          <h3 class="text-xl font-bold text-(--text-primary) mb-2">Temps réel</h3>
          <p class="text-(--text-secondary)">Réponses instantanées</p>
        </div>

        <div class="bg-(--bg-surface) rounded-2xl p-6 shadow-lg border border-(--border-color) text-center hover:shadow-xl transition-all">
          <div class="flex justify-center mb-4">
            <Trophy :size="40" :stroke-width="1.5" class="text-(--color-accent-primary)" />
          </div>
          <h3 class="text-xl font-bold text-(--text-primary) mb-2">Classement</h3>
          <p class="text-(--text-secondary)">Comparez vos scores</p>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="mt-12 bg-(--bg-surface) rounded-2xl p-8 shadow-lg border border-(--border-color)">
        <h3 class="text-2xl font-bold text-(--text-primary) text-center mb-6">Pourquoi QuizApp ?</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="flex items-start space-x-4">
            <BookOpen :size="28" :stroke-width="1.5" class="text-(--color-accent-primary) flex-shrink-0" />
            <div>
              <h4 class="font-bold text-(--text-primary) mb-1">Apprentissage ludique</h4>
              <p class="text-(--text-secondary) text-sm">Apprenez en vous amusant avec des questions variées</p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <Palette :size="28" :stroke-width="1.5" class="text-(--color-accent-secondary) flex-shrink-0" />
            <div>
              <h4 class="font-bold text-(--text-primary) mb-1">Interface moderne</h4>
              <p class="text-(--text-secondary) text-sm">Design épuré et agréable à utiliser</p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <RefreshCw :size="28" :stroke-width="1.5" class="text-(--color-accent-primary) flex-shrink-0" />
            <div>
              <h4 class="font-bold text-(--text-primary) mb-1">Contenu mis à jour</h4>
              <p class="text-(--text-secondary) text-sm">Nouvelles questions régulièrement ajoutées</p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <Smartphone :size="28" :stroke-width="1.5" class="text-(--color-accent-secondary) flex-shrink-0" />
            <div>
              <h4 class="font-bold text-(--text-primary) mb-1">Responsive</h4>
              <p class="text-(--text-secondary) text-sm">Jouez sur tous vos appareils</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Target, Zap, Trophy, BookOpen, Palette, RefreshCw, Smartphone } from 'lucide-vue-next'
</script>