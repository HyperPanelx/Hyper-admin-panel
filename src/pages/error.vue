<template>
  <defaultLayout>
    <p class="sm:text-2.5 text-1.3 text-primary-dark-1 dark:text-primary-light-1">Page not Found!</p>
    <router-link :to="{name:'DASHBOARD'}" class="btn btn-indigo btn-md mt-2">
      Home
    </router-link>
  </defaultLayout>
</template>

<script setup lang="ts">
import defaultLayout from '../layouts/default.vue'

</script>

<style scoped>

</style>