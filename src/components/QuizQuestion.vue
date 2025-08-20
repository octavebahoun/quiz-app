<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-white">Question {{ currentIndex + 1 }} / {{ totalQuestions }}</h3>
      <div class="w-40 h-2 bg-white/10 rounded-full overflow-hidden">
        <div class="h-full bg-purple-500" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <p class="text-purple-200 mb-6" v-html="question.question"></p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button v-for="answer in safeAnswers" :key="answer" @click="selectAnswer(answer)" :disabled="hasSelected" :class="[
        'py-3 px-4 rounded-lg border text-white transition-all duration-200 text-left',
        getAnswerClass(answer),
        hasSelected ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'
      ]" class="min-h-[60px] flex items-center justify-between">
        <span v-html="answer"></span>
        <span v-if="isSelected(answer)" class="ml-2">
          <svg v-if="isCorrect(answer)" class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd" />
          </svg>
          <svg v-else class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </span>
      </button>
    </div>

    <div class="mt-6 flex justify-between">
      <button @click="$emit('prev')" class="quiz-nav-button quiz-nav-prev"
        :disabled="currentIndex === 0">Précédent</button>
      <div class="space-x-2">
        <button v-if="currentIndex < totalQuestions - 1" @click="$emit('next')" :disabled="!hasSelected"
          class="quiz-nav-button quiz-nav-next">
          Suivant
        </button>
        <button v-else @click="$emit('finish')" :disabled="!hasSelected" class="quiz-nav-button quiz-nav-finish">
          Terminer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  question: { type: Object, required: true },
  currentIndex: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  progress: { type: Number, required: true },
})

const emit = defineEmits(['select-answer', 'prev', 'next', 'finish'])

const safeAnswers = computed(() => Array.isArray(props.question?.answers) ? props.question.answers : [])

const hasSelected = computed(() => props.question?.selected !== null && props.question?.selected !== undefined)

const isSelected = (answer) => props.question?.selected === answer

const isCorrect = (answer) => answer === props.question?.correctAnswer

function selectAnswer(answer) {
  if (hasSelected.value) return
  emit('select-answer', answer)
}

function getAnswerClass(answer) {
  if (!hasSelected.value) {
    return 'bg-white/20 hover:bg-white/30 border-white/30'
  }

  if (isSelected(answer)) {
    return isCorrect(answer)
      ? 'bg-green-500/80 border-green-400'
      : 'bg-red-500/80 border-red-400'
  }

  if (isCorrect(answer)) {
    return 'bg-green-500/40 border-green-400'
  }

  return 'bg-white/10 border-white/20 opacity-60'
}
</script>

<style scoped>
.quiz-answer-default {
  @apply bg-white/20 text-white border-white/30;
}

.quiz-answer-correct {
  @apply bg-green-500/80 text-white border-green-400;
}

.quiz-answer-incorrect {
  @apply bg-red-500/80 text-white border-red-400;
}

.quiz-nav-button {
  @apply px-4 py-2 rounded-lg font-medium transition-all duration-200;
}

.quiz-nav-prev {
  @apply bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed;
}

.quiz-nav-next {
  @apply bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed;
}

.quiz-nav-finish {
  @apply bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
