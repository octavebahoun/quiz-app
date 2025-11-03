import { ref } from 'vue'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export function useLeaderboard() {
  const loading = ref(false)
  const error = ref(null)
  const leaderboard = ref([])

  const fetchLeaderboard = async () => {
    try {
      loading.value = true
      error.value = null

      const q = query(collection(db, 'users'), orderBy('totalScore', 'desc'), limit(20))
      const querySnapshot = await getDocs(q)

      leaderboard.value = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        rank: index + 1,
        ...doc.data(),
      }))
    } catch (err) {
      console.error('Error fetching leaderboard:', err)
      error.value = 'Erreur lors du chargement du classement'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    leaderboard,
    fetchLeaderboard,
  }
}
