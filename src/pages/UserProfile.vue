<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Mon Profil</h1>
        <p class="text-gray-600">Gérez vos informations et suivez vos progrès</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd" />
          </svg>
          <span class="text-red-700">{{ error }}</span>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Card -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="text-center">
              <!-- Profile Image -->
              <div class="relative inline-block group">
                <img :src="profile.image || defaultAvatar" alt="Photo de profil"
                  class="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg transition-transform group-hover:scale-105" />
                <label for="fileInput"
                  class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200">
                  <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              </div>
              <input id="fileInput" type="file" accept="image/*" class="hidden" @change="handleImageUpload"
                :disabled="uploading" />

              <h2 class="mt-4 text-xl font-semibold text-gray-800">
                {{ profile.name || 'Utilisateur' }}
              </h2>
              <p class="text-gray-600">{{ profile.email }}</p>

              <!-- Stats -->
              <div class="mt-4 grid grid-cols-2 gap-4">
                <div class="bg-blue-50 rounded-lg p-3">
                  <div class="text-2xl font-bold text-blue-600">{{ profile.totalScore }}</div>
                  <div class="text-sm text-gray-600">Score</div>
                </div>
                <div class="bg-green-50 rounded-lg p-3">
                  <div class="text-2xl font-bold text-green-600">
                    {{ profile.quizCompleted }}
                  </div>
                  <div class="text-sm text-gray-600">Quiz complétés</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 class="font-semibold text-gray-800 mb-4">Actions rapides</h3>
            <button @click="removeImage" :disabled="!profile.image || uploading"
              class="w-full bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Supprimer la photo
            </button>
          </div>
        </div>

        <!-- Profile Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-6">Informations personnelles</h3>

            <form @submit.prevent="saveProfile" class="space-y-6">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input id="name" v-model="profile.name" type="text" :class="[
                  'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                  errors.name
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500',
                ]" placeholder="Votre nom complet" maxlength="50" />
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input id="email" v-model="profile.email" type="email" :class="[
                  'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500',
                ]" placeholder="votre@email.com" disabled />
                <p class="mt-1 text-sm text-gray-500">L'email ne peut pas être modifié</p>
              </div>

              <!-- Bio -->
              <div>
                <label for="bio" class="block text-sm font-medium text-gray-700 mb-2"> Bio </label>
                <textarea id="bio" v-model="profile.bio" rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="Parlez-nous de vous..." maxlength="200"></textarea>
                <p class="mt-1 text-sm text-gray-500">{{ profile.bio?.length || 0 }}/200</p>
              </div>

              <!-- Save Button -->
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div v-if="saving" class="flex items-center">
                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span class="text-sm text-gray-600">Sauvegarde...</span>
                  </div>
                  <div v-else-if="saveSuccess" class="flex items-center text-green-600">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                    <span class="text-sm">Sauvegardé</span>
                  </div>
                </div>

                <button type="submit" :disabled="!isFormValid || saving"
                  class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Sauvegarder les modifications
                </button>
              </div>
            </form>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Activité récente</h3>
            <div v-if="recentActivity.length > 0" class="space-y-3">
              <div v-for="activity in recentActivity" :key="activity.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-800">{{ activity.quizName }}</p>
                  <p class="text-sm text-gray-600">{{ formatDate(activity.completedAt) }}</p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-green-600">{{ activity.score }}/{{ activity.total }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-gray-500 py-8">
              <p>Aucune activité récente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useDebounceFn } from '@vueuse/core'

// Constants
const defaultAvatar = 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=User'

// Reactive state
const loading = ref(true)
const error = ref(null)
const saving = ref(false)
const saveSuccess = ref(false)
const uploading = ref(false)
const profile = ref({
  name: '',
  email: '',
  image: null,
  bio: '',
  score: 0,
  quizCompleted: 0,
})
const errors = ref({
  name: '',
  email: '',
})
const recentActivity = ref([])

// Computed properties
const isFormValid = computed(() => {
  return profile.value.name.trim().length >= 2 && !errors.value.name
})

// Validation functions
const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    errors.value.name = 'Le nom doit contenir au moins 2 caractères'
    return false
  }
  errors.value.name = ''
  return true
}

// Format date helper
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate()
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Load user profile
const loadUserProfile = async () => {
  try {
    loading.value = true
    error.value = null

    const user = auth.currentUser
    if (!user) {
      error.value = 'Utilisateur non connecté'
      return
    }

    // Load profile
    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      profile.value = { ...profile.value, ...userSnap.data() }
    } else {
      // Create new profile
      const newProfile = {
        name: user.displayName || '',
        email: user.email,
        image: null,
        bio: '',
        score: 0,
        quizCompleted: 0,
      }
      await setDoc(userRef, newProfile)
      profile.value = newProfile
    }

    // Load recent activity
    await loadRecentActivity()
  } catch (err) {
    console.error('Error loading profile:', err)
    error.value = 'Erreur lors du chargement du profil'
  } finally {
    loading.value = false
  }
}

// Load recent activity
const loadRecentActivity = async () => {
  try {
    const user = auth.currentUser
    if (!user) return

    const q = query(
      collection(db, 'quizResults'),
      where('userId', '==', user.uid),
      orderBy('completedAt', 'desc'),
      limit(5),
    )

    const querySnapshot = await getDocs(q)
    recentActivity.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (err) {
    console.error('Error loading recent activity:', err)
  }
}

// Handle image upload
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type and size
  if (!file.type.startsWith('image/')) {
    alert('Veuillez sélectionner une image valide')
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    // 2MB limit
    alert("L'image ne doit pas dépasser 2MB")
    return
  }

  uploading.value = true
  try {
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.value.image = e.target.result
      saveProfile()
    }
    reader.readAsDataURL(file)
  } catch (err) {
    console.error('Error uploading image:', err)
    alert("Erreur lors du téléchargement de l'image")
  } finally {
    uploading.value = false
  }
}

// Remove image
const removeImage = async () => {
  profile.value.image = null
  await saveProfile()
}

// Save profile with debounce
const saveProfile = useDebounceFn(async () => {
  if (!isFormValid.value) return

  try {
    saving.value = true
    const user = auth.currentUser
    if (!user) return

    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, {
      name: profile.value.name.trim(),
      bio: profile.value.bio?.trim() || '',
      image: profile.value.image,
      updatedAt: new Date(),
    })

    saveSuccess.value = true
    setTimeout(() => {
      saveSuccess.value = false
    }, 3000)
  } catch (err) {
    console.error('Error saving profile:', err)
    alert('Erreur lors de la sauvegarde')
  } finally {
    saving.value = false
  }
}, 1000)

// Watch for changes
watch(() => profile.value.name, validateName)

// Lifecycle
onMounted(() => {
  loadUserProfile()
})

// Auth state listener
auth.onAuthStateChanged((user) => {
  if (user) {
    loadUserProfile()
  } else {
    error.value = 'Utilisateur non connecté'
  }
})
</script>

<style scoped>
/* Custom animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
