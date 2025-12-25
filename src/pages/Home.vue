<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import TheWelcome from '@/components/TheWelcome.vue'
import GoogleLogin from '@/components/GoogleLogin.vue'
import { useUser } from '@/composables/useUser'

const { user, isLoggedIn, clearUser } = useUser()
</script>

<template>
  <header class="relative">
    <div class="absolute top-0 right-0 p-4">
      <div v-if="isLoggedIn()" class="flex items-center gap-3">
        <span class="text-sm font-medium text-gray-700">{{ user?.name }}</span>
        <img 
          v-if="user?.avatar" 
          :src="user.avatar" 
          :alt="user.name"
          class="w-10 h-10 rounded-full border border-gray-200"
        />
        <div v-else class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
           {{ user?.name?.charAt(0)?.toUpperCase() }}
        </div>
        <!-- Optional Logout button for testing -->
        <!-- <button @click="clearUser" class="text-xs text-red-500">Logout</button> -->
      </div>
      <GoogleLogin v-else />
    </div>

    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <div class="mt-4 text-center">
        <p class="text-green-500 font-bold">
          <font-awesome-icon icon="user-secret" /> Tailwind & FontAwesome Active
        </p>
      </div>
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
