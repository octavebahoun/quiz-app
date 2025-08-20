<template>
  <BaseTemplate>
    <CategoryQuiz title="Quiz Géographie" description="Testez vos connaissances géographiques avec nos quiz !"
      titleGradient="from-green-400 to-blue-400" :default-category-id="CATEGORY_ID" />
  </BaseTemplate>
</template>

<script setup>
const CATEGORY_ID = 22
import BaseTemplate from '@/templates/BaseTemplate.vue'
import CategoryQuiz from '@/components/CategoryQuiz.vue'
</script>
