<template>
  <NuxtLayout name="default">
      {{error}}
    <button @click="backHome">
      Home
    </button>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({layout:'default'})
const error=useError()

const backHome = () => {
  clearError({redirect:'/dashboard'})
}
</script>

<style scoped>

</style>