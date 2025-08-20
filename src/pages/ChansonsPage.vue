<script setup>
import BaseTemplate from '@/templates/BaseTemplate.vue'
import CategoryQuiz from '@/components/CategoryQuiz.vue'
const CATEGORY_ID = 12
</script>

<template>
  <BaseTemplate>
    <CategoryQuiz title="Quiz Musique" description="Testez vos connaissances musicales avec nos questions variées !"
      titleGradient="from-pink-400 to-red-400" :default-category-id="CATEGORY_ID" />
  </BaseTemplate>
</template>
