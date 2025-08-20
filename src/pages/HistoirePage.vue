<template>
  <BaseTemplate>
    <CategoryQuiz title="Quiz Histoire" description="Parcourez les grandes périodes et événements historiques."
      titleGradient="from-amber-400 to-orange-500" :default-category-id="CATEGORY_ID" />
  </BaseTemplate>
</template>

<script setup>
import BaseTemplate from '@/templates/BaseTemplate.vue'
import CategoryQuiz from '@/components/CategoryQuiz.vue'
const CATEGORY_ID = 23
</script>
