<template>
  <div class="bg-(--bg-surface) rounded-2xl p-8 shadow-lg border border-(--border-color)">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-(--text-primary)">Question {{ currentIndex + 1 }} / {{ totalQuestions }}</h3>
      <div class="w-40 h-2 bg-(--bg-interactive) rounded-full overflow-hidden">
        <div class="h-full transition-all duration-300" 
             style="background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));"
             :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <p class="text-(--text-primary) text-lg mb-6" v-html="question.question"></p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button v-for="answer in safeAnswers" :key="answer" @click="selectAnswer(answer)" :disabled="hasSelected" :class="[
        'py-3 px-4 rounded-lg border transition-all duration-200 text-left',
        getAnswerClass(answer),
        hasSelected ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105 hover:shadow-md'
      ]" class="min-h-[60px] flex items-center justify-between">
        <span class="text-(--text-primary)" v-html="answer"></span>
        <span v-if="isSelected(answer)" class="ml-2">
          <CheckCircle v-if="isCorrect(answer)" :size="20" class="text-(--success)" />
          <X v-else :size="20" class="text-(--error)" />
        </span>
      </button>
    </div>

    <div class="mt-6 flex justify-between">
      <button @click="$emit('prev')" 
        class="px-6 py-2 bg-(--bg-interactive) text-(--text-primary) rounded-lg font-medium border border-(--border-color) hover:border-(--color-accent-primary) transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="currentIndex === 0">
        ← Précédent
      </button>
      <div class="space-x-2">
        <button v-if="currentIndex < totalQuestions - 1" @click="$emit('next')" :disabled="!hasSelected"
          class="px-6 py-2 text-white rounded-lg font-medium hover:opacity-90 hover:transform hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style="background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));">
          Suivant →
        </button>
        <button v-else @click="$emit('finish')" :disabled="!hasSelected" 
          class="px-6 py-2 text-white rounded-lg font-medium hover:opacity-90 hover:transform hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style="background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));">
          Terminer 🏁
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CheckCircle, X } from 'lucide-vue-next'

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
    return 'bg-(--bg-interactive) border-(--border-color)'
  }

  if (isSelected(answer)) {
    return isCorrect(answer)
      ? 'bg-green-100 dark:bg-green-900/30 border-(--success)'
      : 'bg-red-100 dark:bg-red-900/30 border-(--error)'
  }

  if (isCorrect(answer)) {
    return 'bg-green-50 dark:bg-green-900/20 border-(--success)'
  }

  return 'bg-(--bg-interactive) border-(--border-color) opacity-60'
}
</script>