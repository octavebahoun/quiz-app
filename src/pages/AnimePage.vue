<template>
  <BaseTemplate>
    <CategoryQuiz title="Anime Quiz Arena" description="Test your otaku knowledge! 🎌✨"
      titleGradient="from-pink-400 to-purple-400" :default-category-id="CATEGORY_ID"
      :category-options="categoryOptions" />
  </BaseTemplate>
</template>

<script setup>
import BaseTemplate from '@/templates/BaseTemplate.vue'
import CategoryQuiz from '@/components/CategoryQuiz.vue'

const CATEGORY_ID = 31

const categoryOptions = [
  { id: 52, name: 'Anime' },
  { id: 11, name: 'Chimie' },
]
</script>
