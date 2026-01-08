<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="bg-white border-b border-gray-200">
    <nav class="w-full px-6 py-4 flex items-center justify-between">
      <RouterLink to="/" class="text-xl font-bold text-gray-800">
        Vue Template
      </RouterLink>
      <div class="space-x-4">
        <RouterLink to="/" class="text-gray-600 hover:text-gray-900">Home</RouterLink>
        <RouterLink to="/about" class="text-gray-600 hover:text-gray-900">About Us</RouterLink>
        <RouterLink to="/terms" class="text-gray-600 hover:text-gray-900">Terms</RouterLink>
        <RouterLink to="/privacy" class="text-gray-600 hover:text-gray-900">Privacy</RouterLink>
      </div>
    </nav>
  </header>
</template>
