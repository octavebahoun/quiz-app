<template>
  <BaseTemplate>
    <CategoryQuiz title="Quiz Technologie" description="Technologies web, IA, mobile et plus."
      titleGradient="from-cyan-400 to-blue-400" :default-category-id="CATEGORY_ID" />
  </BaseTemplate>
</template>

<script setup>
import BaseTemplate from '@/templates/BaseTemplate.vue'
import CategoryQuiz from '@/components/CategoryQuiz.vue'
const CATEGORY_ID = 30
</script>
