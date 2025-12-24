<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h2 class="text-xl font-semibold mb-2">Processing Google Login...</h2>
      <p class="text-gray-500">Please wait while we log you in.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { googleService } from '@/services/google';
import { tokenStorage } from '@/utils/storage';

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    const params = route.query;
    // Log params for debugging
    console.log('Callback params:', params);

    // If no params, it might be an error or manual access
    if (Object.keys(params).length === 0) {
       // Just redirect to home if no params
       router.replace('/');
       return;
    }

    const response = await googleService.handleCallback(params);
    
    if (response.code === 0 && response.data?.token) {
      tokenStorage.setToken(response.data.token);
      // Determine where to redirect (could be stored in state/cookie before auth)
      router.replace('/');
    } else {
      console.error('Google Auth Failed', response);
      alert(response.message || 'Authentication failed');
      router.replace('/');
    }
  } catch (error) {
    console.error('Google Auth Error', error);
    alert('An error occurred during authentication');
    router.replace('/');
  }
});
</script>
