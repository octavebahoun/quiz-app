<template>
  <BaseTemplate>
    <CategoryQuiz title="Quiz Physique" description="Lois, phénomènes et concepts de physique."
      titleGradient="from-cyan-400 to-blue-400" :default-category-id="CATEGORY_ID"
      :category-options="categoryOptions" />
  </BaseTemplate>
</template>

<script setup>
import BaseTemplate from '@/templates/BaseTemplate.vue'
import CategoryQuiz from '@/components/CategoryQuiz.vue'

// ID de la catégorie Physique
const CATEGORY_ID = 17

// Exemple : si tu veux lister d'autres catégories pour le select (même si bloqué)
const categoryOptions = [
  { id: 10, name: 'Physique' },
  { id: 11, name: 'Chimie' },
]
</script>
