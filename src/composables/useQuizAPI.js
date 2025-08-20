// /composables/useQuizAPI.js
import { ref, computed } from 'vue'

export function useQuizAPI(apiKey) {
  const quizStarted = ref(false)
  const quizFinished = ref(false)
  const questions = ref([])
  const currentIndex = ref(0)
  const score = ref(0)
  const isLoading = ref(false)
  const error = ref(null)

  const currentQuestion = computed(() => questions.value[currentIndex.value] || {})
  const progress = computed(() =>
    questions.value.length ? ((currentIndex.value + 1) / questions.value.length) * 100 : 0,
  )

  const fetchQuiz = async ({ limit = 5, category = '', difficulty = '' } = {}) => {
    isLoading.value = true
    error.value = null
    try {
      const url = new URL('https://quizapi.io/api/v1/questions')
      const params = { apiKey, limit: String(limit) }
      if (category) params.category = category
      if (difficulty) params.difficulty = difficulty
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

      const res = await fetch(url.toString(), {
        headers: { 'X-Api-Key': apiKey },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()
      questions.value = data.map((q) => {
        const answers = Object.entries(q.answers)
          .filter(([_, v]) => v)
          .map(([key, v]) => ({
            key,
            text: v,
          }))

        const correctKey = Object.entries(q.correct_answers)
          .find(([k, v]) => v === 'true')?.[0]
          ?.replace('_correct', '')

        return {
          id: q.id,
          question: q.question,
          answers,
          correctKey,
          selectedKey: null,
          isCorrect: null,
        }
      })

      quizStarted.value = true
      quizFinished.value = false
      currentIndex.value = 0
      score.value = 0
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const selectAnswer = (key) => {
    const q = currentQuestion.value
    if (!q || q.selectedKey !== null) return
    q.selectedKey = key
    q.isCorrect = key === q.correctKey
    if (q.isCorrect) score.value++
  }

  const getAnswerClass = (key) => {
    const q = currentQuestion.value
    if (!q.selectedKey) return 'default'
    if (key === q.correctKey) return 'correct'
    if (key === q.selectedKey && !q.isCorrect) return 'incorrect'
    return 'neutral'
  }

  const next = () => {
    if (currentIndex.value < questions.value.length - 1) currentIndex.value++
  }
  const prev = () => {
    if (currentIndex.value > 0) currentIndex.value--
  }
  const finish = () => {
    quizFinished.value = true
    quizStarted.value = false
  }

  const reset = () => {
    quizStarted.value = false
    quizFinished.value = false
    questions.value = []
    currentIndex.value = 0
    score.value = 0
    error.value = null
  }

  return {
    quizStarted,
    quizFinished,
    questions,
    currentIndex,
    score,
    isLoading,
    error,
    currentQuestion,
    progress,
    fetchQuiz,
    selectAnswer,
    getAnswerClass,
    next,
    prev,
    finish,
    reset,
  }
}
