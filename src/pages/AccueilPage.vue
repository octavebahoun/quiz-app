<template>
  <div>

    <header class="text-center py-16">
      <h1 class="text-5xl font-bold text-white mb-4">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
          Bienvenue sur QuizMania
        </span>
      </h1>
      <p class="text-purple-200 text-xl">Testez vos connaissances avec nos quiz interactifs !</p>
    </header>

    <div class="max-w-4xl mx-auto">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <h2 class="text-3xl font-bold text-white mb-4">Prêt à relever le défi ?</h2>
          <p class="text-purple-200 text-lg mb-6">
            Explorez différentes catégories et testez vos connaissances avec nos quiz interactifs et amusants.
          </p>
          <router-link to="/quiz"
            class="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200">
            Commencer maintenant
          </router-link>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 text-center">
          <div class="text-4xl mb-4">🎯</div>
          <h3 class="text-xl font-bold text-white mb-2">Quiz variés</h3>
          <p class="text-purple-200">Plus de 10 catégories différentes</p>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 text-center">
          <div class="text-4xl mb-4">⚡</div>
          <h3 class="text-xl font-bold text-white mb-2">Temps réel</h3>
          <p class="text-purple-200">Défis chronométrés</p>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 text-center">
          <div class="text-4xl mb-4">🏆</div>
          <h3 class="text-xl font-bold text-white mb-2">Classement</h3>
          <p class="text-purple-200">Comparez vos scores</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>
