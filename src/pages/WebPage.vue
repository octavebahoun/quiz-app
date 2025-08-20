<template>
  <BaseTemplate>
    <CategoryQuiz title="Quiz sport" description="Sport et bonnes pratiques."
      titleGradient="from-indigo-400 to-purple-400" :default-category-id="CATEGORY_ID" />
  </BaseTemplate>
</template>

<script setup>
import BaseTemplate from '@/templates/BaseTemplate.vue'
import CategoryQuiz from '@/components/CategoryQuiz.vue'
const CATEGORY_ID = 21
</script>
