<template>
  <BaseTemplate>
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-white mb-6">Classement Global</h1>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
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

      <!-- Leaderboard -->
      <div v-else class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
        <div class="space-y-4">
          <div v-for="user in leaderboard" :key="user.id"
            class="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <!-- Rank and Avatar -->
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                  {{ user.rank }}
                </div>
              </div>
              <div class="flex-shrink-0">
                <img :src="user.image || defaultAvatar" :alt="user.name || 'Utilisateur'"
                  class="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
              </div>
              <div>
                <h3 class="text-white font-semibold">{{ user.name || 'Utilisateur anonyme' }}</h3>
                <p class="text-purple-200 text-sm">{{ user.quizCompleted || 0 }} quiz complétés</p>
              </div>
            </div>

            <!-- Score -->
            <div class="text-right">
              <div class="text-2xl font-bold text-white">{{ user.totalScore || 0 }}</div>
              <div class="text-purple-200 text-sm">points</div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="leaderboard.length === 0" class="text-center py-12">
            <svg class="w-16 h-16 text-purple-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-xl font-semibold text-white mb-2">Aucun résultat</h3>
            <p class="text-purple-200">Soyez le premier à compléter un quiz !</p>
          </div>
        </div>
      </div>
    </div>
  </BaseTemplate>
</template>

<script setup>
import { onMounted } from 'vue'
import BaseTemplate from '@/templates/BaseTemplate.vue'
import { useLeaderboard } from '@/composables/useLeaderboard'

const defaultAvatar = 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=User'

const { loading, error, leaderboard, fetchLeaderboard } = useLeaderboard()

onMounted(() => {
  fetchLeaderboard()
})
</script>


