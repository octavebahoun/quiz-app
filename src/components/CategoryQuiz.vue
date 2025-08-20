<template>
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold text-white mb-4">
        <span class="bg-clip-text text-transparent bg-gradient-to-r" :class="titleGradient">
          {{ title }}
        </span>
      </h1>
      <p v-if="description" class="text-purple-200 text-xl">{{ description }}</p>
    </div>

    <!-- Configuration Quiz -->
    <div v-if="!quizStarted && !quizFinished" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        <h3 class="text-2xl font-bold text-white mb-4">Paramètres du Quiz</h3>

        <form @submit.prevent="onStart" class="space-y-4 text-white">
          <div>
            <label class="block mb-1 font-medium">Nombre de questions</label>
            <input type="number" v-model.number="config.amount" min="1" max="50"
              class="w-full rounded-md p-2 text-black bg-white/90 focus:ring-2 focus:ring-purple-400" required />
          </div>

          <div v-if="!isCategoryLocked">
            <label>Catégorie</label>
            <select v-model="config.category">
              <option value="">Toutes</option>
              <option v-for="cat in categoryOptions" :key="cat.id" :value="Number(cat.id)">
                {{ cat.name }}
              </option>
            </select>
          </div>



          <div>
            <label class="block mb-1 font-medium">Difficulté</label>
            <select v-model="config.difficulty"
              class="w-full rounded-md p-2 text-black bg-white/90 focus:ring-2 focus:ring-purple-400">
              <option value="">Toutes</option>
              <option value="easy">Facile</option>
              <option value="medium">Moyenne</option>
              <option value="hard">Difficile</option>
            </select>
          </div>

          <div>
            <label class="block mb-1 font-medium">Type de questions</label>
            <select v-model="config.type"
              class="w-full rounded-md p-2 text-black bg-white/90 focus:ring-2 focus:ring-purple-400">
              <option value="">Toutes</option>
              <option value="multiple">Choix multiples</option>
              <option value="boolean">Vrai/Faux</option>
            </select>
          </div>

          <button type="submit" :disabled="isLoading"
            class="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="isLoading">Chargement...</span>
            <span v-else>Démarrer le Quiz</span>
          </button>

          <div v-if="error" class="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {{ error }}
          </div>
        </form>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading && quizStarted" class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto"></div>
      <p class="text-white mt-4">Chargement des questions...</p>
    </div>

    <!-- Quiz Questions -->
    <QuizQuestion v-if="quizStarted && !isLoading && !quizFinished" :question="currentQuestion"
      :current-index="currentIndex" :total-questions="questions.length" :progress="progress"
      @select-answer="selectAnswer" @next="nextQuestion" @prev="prevQuestion" @finish="finishQuiz" />


    <!-- Score -->
    <div v-if="quizFinished" class="text-center">
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        <h2 class="text-3xl font-bold text-white mb-4">
          Votre score : {{ score }} / {{ questions.length }}
        </h2>

        <div class="mb-6">
          <div class="text-6xl mb-4">
            {{ scorePercentage >= 80 ? '🎉' : scorePercentage >= 60 ? '👍' : '📚' }}
          </div>
          <p class="text-purple-200 text-lg">
            {{ scorePercentage >= 80 ? 'Excellent !' : scorePercentage >= 60 ? 'Bien joué !' : 'Continuez à apprendre!'
            }}
          </p>
        </div>

        <div class="flex gap-4 justify-center">
          <button @click="resetQuiz"
            class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
            Refaire le Quiz
          </button>

          <button @click="showAnswers = !showAnswers"
            class="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200">
            {{ showAnswers ? 'Masquer' : 'Voir' }} les réponses
          </button>
        </div>
      </div>

      <!-- Detailed Results -->
      <div v-if="showAnswers" class="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <h3 class="text-xl font-bold text-white mb-4">Réponses détaillées</h3>
        <div class="space-y-4">
          <div v-for="(q, index) in questions" :key="index" class="p-4 rounded-lg"
            :class="q.isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'">
            <p class="text-white font-medium mb-2">Question {{ index + 1 }}:</p>
            <p class="text-purple-200 mb-2" v-html="q.question"></p>
            <p class="text-sm">
              <span class="text-green-400">✓ Réponse correcte:</span>
              <span v-html="q.correctAnswer"></span>
            </p>
            <p v-if="q.selected && !q.isCorrect" class="text-sm text-red-400">
              <span>✗ Votre réponse:</span>
              <span v-html="q.selected"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useQuiz } from '@/composables/useQuiz'
import QuizQuestion from '@/components/QuizQuestion.vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  titleGradient: { type: String, default: 'from-pink-400 to-purple-400' },
  defaultCategoryId: { type: [String, Number], default: '' }, // <--- ici
  categoryOptions: { type: Array, default: () => [] },
})

const showAnswers = ref(false)

const config = ref({
  amount: 5,
  category: props.defaultCategoryId ? Number(props.defaultCategoryId) : '',
  difficulty: '',
  type: ''
})


const {
  quizStarted,
  quizFinished,
  questions,
  currentIndex,
  score,
  isLoading,
  error,
  currentQuestion,
  progress,
  startQuiz,
  selectAnswer,
  nextQuestion,
  prevQuestion,
  finishQuiz,
  resetQuiz
} = useQuiz()


const isCategoryLocked = computed(() => Boolean(props.defaultCategoryId))

watchEffect(() => {
  if (props.defaultCategoryId) {
    config.value.category = Number(props.defaultCategoryId)
  }
})


const scorePercentage = computed(() =>
  questions.value.length > 0 ? Math.round((score.value / questions.value.length) * 100) : 0
)

function onStart() {
  startQuiz({
    amount: config.value.amount,
    category: config.value.category || '',
    difficulty: config.value.difficulty,
    type: config.value.type,
  })
}


</script>
