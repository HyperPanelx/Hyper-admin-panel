<template>
  <NuxtLayout name="setting">
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  name:'SETTINGS',
  redirect:{name:'CHANGE_PASSWORD'}
})
</script>

