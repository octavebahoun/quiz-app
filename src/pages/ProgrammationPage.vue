//a venir
<template>
  <BaseTemplate>
    <CategoryQuiz title="Quiz Mathématiques" description="Défis et problèmes de mathématiques."
      titleGradient="from-green-400 to-emerald-400" :default-category-id="CATEGORY_ID" />
  </BaseTemplate>
</template>

<script setup>
import BaseTemplate from '@/templates/BaseTemplate.vue'
import CategoryQuiz from '@/components/CategoryQuiz.vue'
const CATEGORY_ID = 19
</script>
