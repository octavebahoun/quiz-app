<template>
  <div class="min-h-screen bg-(--bg-primary) transition-colors duration-300">
    <!-- Animated Background - Subtil avec les nouvelles couleurs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
      <div
        class="absolute top-0 -left-4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
        style="background-color: var(--gradient-start);">
      </div>
      <div
        class="absolute top-0 -right-4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
        style="background-color: var(--gradient-mid);">
      </div>
      <div
        class="absolute -bottom-8 left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"
        style="background-color: var(--gradient-end);">
      </div>
    </div>

    <div class="relative z-10">
      <slot name="header">
        <!-- Default header content -->
      </slot>

      <main class="container mx-auto px-4 py-8">
        <slot>
          <!-- Main content goes here -->
        </slot>
      </main>

      <slot name="footer">
        <!-- Default footer content -->
      </slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>