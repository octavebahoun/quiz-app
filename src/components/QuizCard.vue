<template>
  <div
    class="p-6 rounded-lg shadow-lg text-dark-blue-50 cursor-pointer hover:scale-105 transition-transform"
    :class="theme.color"
    @click="$emit('click')"
  >
    <h2 class="text-xl font-semibold text-center">{{ theme.name }}</h2>
  </div>
</template>

<script setup>
defineProps({
  theme: {
    type: Object,
    required: true,
  },
})
</script>
