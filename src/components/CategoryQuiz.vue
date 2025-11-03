<template>
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold mb-4 bg-clip-text text-transparent" 
          style="background-image: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));">
        {{ title }}
      </h1>
      <p v-if="description" class="text-(--text-secondary) text-xl">{{ description }}</p>
    </div>

    <!-- Configuration Quiz -->
    <div v-if="!quizStarted && !quizFinished" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-(--bg-surface) rounded-2xl p-8 shadow-lg border border-(--border-color)">
        <h3 class="text-2xl font-bold text-(--text-primary) mb-4">Paramètres du Quiz</h3>

        <form @submit.prevent="onStart" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium text-(--text-primary)">Nombre de questions</label>
            <input type="number" v-model.number="config.amount" min="1" max="50"
              class="w-full rounded-md p-2 bg-(--bg-interactive) text-(--text-primary) border border-(--border-color) focus:outline-none focus:ring-2 focus:ring-(--color-primary)" required />
          </div>

          <div v-if="!isCategoryLocked">
            <label class="block mb-1 font-medium text-(--text-primary)">Catégorie</label>
            <select v-model="config.category" class="w-full rounded-md p-2 bg-(--bg-interactive) text-(--text-primary) border border-(--border-color) focus:outline-none focus:ring-2 focus:ring-(--color-primary)">
              <option value="">Toutes</option>
              <option v-for="cat in categoryOptions" :key="cat.id" :value="Number(cat.id)">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block mb-1 font-medium text-(--text-primary)">Difficulté</label>
            <select v-model="config.difficulty"
              class="w-full rounded-md p-2 bg-(--bg-interactive) text-(--text-primary) border border-(--border-color) focus:outline-none focus:ring-2 focus:ring-(--color-primary)">
              <option value="">Toutes</option>
              <option value="easy">Facile</option>
              <option value="medium">Moyenne</option>
              <option value="hard">Difficile</option>
            </select>
          </div>

          <div>
            <label class="block mb-1 font-medium text-(--text-primary)">Type de questions</label>
            <select v-model="config.type"
              class="w-full rounded-md p-2 bg-(--bg-interactive) text-(--text-primary) border border-(--border-color) focus:outline-none focus:ring-2 focus:ring-(--color-primary)">
              <option value="">Toutes</option>
              <option value="multiple">Choix multiples</option>
              <option value="boolean">Vrai/Faux</option>
            </select>
          </div>

          <button type="submit" :disabled="isLoading"
            class="w-full py-3 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 hover:transform hover:translate-y-[-2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style="background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));">
            <span v-if="isLoading">Chargement...</span>
            <span v-else>Démarrer le Quiz</span>
          </button>

          <div v-if="error" class="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-(--error) rounded-lg text-(--error)">
            {{ error }}
          </div>
        </form>
      </div>

      <!-- Info Card -->
      <div class="bg-(--bg-surface) rounded-2xl p-8 shadow-lg border border-(--border-color)">
        <h3 class="text-2xl font-bold text-(--text-primary) mb-4">Comment jouer ?</h3>
        <ul class="space-y-3 text-(--text-secondary)">
          <li class="flex items-start">
            <FileText :size="24" :stroke-width="1.5" class="text-(--color-accent-primary) mr-3 flex-shrink-0" />
            <span>Choisissez le nombre de questions et la difficulté</span>
          </li>
          <li class="flex items-start">
            <Clock :size="24" :stroke-width="1.5" class="text-(--color-accent-secondary) mr-3 flex-shrink-0" />
            <span>Répondez à chaque question en sélectionnant une réponse</span>
          </li>
          <li class="flex items-start">
            <CheckCircle :size="24" :stroke-width="1.5" class="text-(--success) mr-3 flex-shrink-0" />
            <span>Les bonnes réponses apparaissent en vert</span>
          </li>
          <li class="flex items-start">
            <Trophy :size="24" :stroke-width="1.5" class="text-(--color-accent-primary) mr-3 flex-shrink-0" />
            <span>Obtenez le meilleur score possible !</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading && quizStarted" class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto" style="border-color: var(--color-accent-primary);"></div>
      <p class="text-(--text-primary) mt-4">Chargement des questions...</p>
    </div>

    <!-- Quiz Questions -->
    <QuizQuestion v-if="quizStarted && !isLoading && !quizFinished" :question="currentQuestion"
      :current-index="currentIndex" :total-questions="questions.length" :progress="progress"
      @select-answer="selectAnswer" @next="nextQuestion" @prev="prevQuestion" @finish="finishQuiz" />


    <!-- Score -->
    <div v-if="quizFinished" class="text-center">
      <div class="bg-(--bg-surface) rounded-2xl p-8 shadow-lg border border-(--border-color)">
        <h2 class="text-3xl font-bold text-(--text-primary) mb-4">
          Votre score : {{ score }} / {{ questions.length }}
        </h2>

        <div class="mb-6">
          <div class="flex justify-center mb-4">
            <Trophy v-if="scorePercentage >= 80" :size="64" :stroke-width="1.5" class="text-(--color-accent-primary)" />
            <CheckCircle v-else-if="scorePercentage >= 60" :size="64" :stroke-width="1.5" class="text-(--success)" />
            <FileText v-else :size="64" :stroke-width="1.5" class="text-(--color-accent-secondary)" />
          </div>
          <p class="text-(--text-secondary) text-lg">
            {{ scorePercentage >= 80 ? 'Excellent !' : scorePercentage >= 60 ? 'Bien joué !' : 'Continuez à apprendre!'
            }}
          </p>
        </div>

        <div class="flex gap-4 justify-center">
          <button @click="resetQuiz"
            class="px-6 py-3 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 hover:transform hover:translate-y-[-2px] transition-all duration-200"
            style="background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));">
            Recommencer
          </button>
          <router-link to="/quiz"
            class="px-6 py-3 bg-(--bg-interactive) text-(--text-primary) font-semibold rounded-xl shadow-lg border border-(--border-color) hover:border-(--color-accent-primary) transition-all duration-200">
            Choisir un autre quiz
          </router-link>
        </div>

        <!-- Détails des réponses -->
        <div class="mt-8 text-left">
          <h3 class="text-xl font-bold text-(--text-primary) mb-4">Récapitulatif</h3>
          <div class="space-y-3">
            <div v-for="(q, idx) in questions" :key="idx"
              class="p-4 rounded-lg border"
              :class="q.isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-(--success)' : 'bg-red-50 dark:bg-red-900/20 border-(--error)'">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <p class="font-medium text-(--text-primary) mb-1" v-html="q.question"></p>
                  <p class="text-sm text-(--text-secondary)">
                    Votre réponse: <span :class="q.isCorrect ? 'text-(--success)' : 'text-(--error)'" v-html="q.selected"></span>
                  </p>
                  <p v-if="!q.isCorrect" class="text-sm text-(--success)">
                    Bonne réponse: <span v-html="q.correctAnswer"></span>
                  </p>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <CheckCircle v-if="q.isCorrect" :size="24" class="text-(--success)" />
                  <X v-else :size="24" class="text-(--error)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuiz } from '@/composables/useQuiz'
import QuizQuestion from './QuizQuestion.vue'
import { FileText, Clock, CheckCircle, Trophy, X } from 'lucide-vue-next'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  titleGradient: { type: String, default: 'from-blue-400 to-purple-400' },
  defaultCategoryId: { type: Number, default: null },
  categoryOptions: { type: Array, default: () => [] },
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
  resetQuiz,
} = useQuiz()

const config = ref({
  amount: 10,
  category: props.defaultCategoryId || '',
  difficulty: '',
  type: '',
})

const isCategoryLocked = computed(() => props.defaultCategoryId !== null)

const scorePercentage = computed(() => {
  if (questions.value.length === 0) return 0
  return Math.round((score.value / questions.value.length) * 100)
})

onMounted(() => {
  if (isCategoryLocked.value) {
    config.value.category = props.defaultCategoryId
  }
})

async function onStart() {
  await startQuiz(config.value)
}
</script>