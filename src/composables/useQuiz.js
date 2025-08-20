import { ref, computed } from 'vue'

export function useQuiz() {
  const quizStarted = ref(false)
  const quizFinished = ref(false)
  const questions = ref([])
  const currentIndex = ref(0)
  const score = ref(0)
  const isLoading = ref(false)
  const error = ref(null)

  // Renvoie la question actuelle (réactive)
  const currentQuestion = computed(() => questions.value[currentIndex.value] || {})

  // Progression en pourcentage
  const progress = computed(() => {
    if (questions.value.length === 0) return 0
    return ((currentIndex.value + 1) / questions.value.length) * 100
  })

  // Lancer le quiz avec configuration
  const startQuiz = async (config = { amount: 5, category: '', difficulty: '', type: '' }) => {
    isLoading.value = true
    error.value = null

    try {
      const url = new URL('https://opentdb.com/api.php')
      url.searchParams.set('amount', String(config.amount || 5))
      if (config.category) url.searchParams.set('category', String(config.category))
      if (config.difficulty) url.searchParams.set('difficulty', String(config.difficulty))
      if (config.type) url.searchParams.set('type', String(config.type))

      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()
      if (data.response_code !== 0) {
        throw new Error('Aucun résultat pour ces paramètres. Essayez d’autres options.')
      }

      const decodeHtml = (html) => {
        const txt = document.createElement('textarea')
        txt.innerHTML = html
        return txt.value
      }

      const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
      }

      questions.value = data.results.map((q) => {
        const decodedQuestion = decodeHtml(q.question)
        const decodedCorrect = decodeHtml(q.correct_answer)
        const decodedIncorrect = q.incorrect_answers.map((a) => decodeHtml(a))
        const answersList = shuffle([...decodedIncorrect, decodedCorrect])
        return {
          question: decodedQuestion,
          answers: answersList,
          correctAnswer: decodedCorrect,
          selected: null,
          isCorrect: null,
          score: 0, // score individuel de la question
        }
      })

      quizStarted.value = true
      quizFinished.value = false
      currentIndex.value = 0
      score.value = 0
    } catch (err) {
      error.value = err.message
      console.error('Error fetching quiz:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Sélectionner une réponse
  const selectAnswer = (answer) => {
    const question = currentQuestion.value
    if (!question || question.selected !== null) return

    question.selected = answer
    question.isCorrect = answer === question.correctAnswer
    question.score = question.isCorrect ? 1 : 0

    // Mettre à jour score global
    score.value = questions.value.reduce((total, q) => total + q.score, 0)
  }

  // Classe des réponses pour le rendu
  const getAnswerClass = (answer) => {
    const question = currentQuestion.value
    if (!question || question.selected === null) return 'quiz-answer-default'

    const isSelected = answer === question.selected
    const isCorrect = answer === question.correctAnswer

    if (isCorrect) return 'quiz-answer-correct' // bonne réponse → vert
    if (isSelected && !isCorrect) return 'quiz-answer-incorrect' // mauvaise réponse → rouge
    if (
      !isSelected &&
      !isCorrect &&
      question.selected &&
      !question.isCorrect &&
      answer === question.correctAnswer
    ) {
      return 'quiz-answer-correct' // si l'utilisateur s'est trompé, montrer la vraie réponse
    }
    return 'quiz-answer-neutral'
  }

  // Questions suivantes / précédentes
  const nextQuestion = () => {
    if (currentIndex.value < questions.value.length - 1) {
      currentIndex.value++
    }
  }

  const prevQuestion = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--
    }
  }

  const finishQuiz = () => {
    quizFinished.value = true
    quizStarted.value = false
  }

  const resetQuiz = () => {
    quizStarted.value = false
    quizFinished.value = false
    questions.value = []
    currentIndex.value = 0
    score.value = 0
    isLoading.value = false
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
    startQuiz,
    selectAnswer,
    getAnswerClass,
    nextQuestion,
    prevQuestion,
    finishQuiz,
    resetQuiz,
  }
}
