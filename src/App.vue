<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

useHead({
  title: "Vue Template"
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
