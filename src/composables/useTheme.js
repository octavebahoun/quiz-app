import { ref, onMounted, watch } from 'vue'

export function useTheme() {
  const isDark = ref(true) // Mode sombre par défaut
  const THEME_KEY = 'quiz-app-theme'

  // Charger le thème depuis localStorage
  const loadTheme = () => {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      // Détecter la préférence système
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  // Appliquer le thème au document
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }

  // Basculer entre les thèmes
  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  // Surveiller les changements
  watch(isDark, () => {
    applyTheme()
  })

  // Charger au montage
  onMounted(() => {
    loadTheme()
  })

  return {
    isDark,
    toggleTheme,
  }
}