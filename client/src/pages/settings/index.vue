<template>
  <NuxtLayout name="setting">
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route=useRoute();
definePageMeta({
  name:'SETTINGS',
  redirect:{name:'CREATE_ADMIN_USER'}
});
useHead({
  titleTemplate(){
    return `Settings > ${route.path.slice(10).split('-').join(' ').charAt(0).toUpperCase()+route.path.slice(10).split('-').join(' ').slice(1)} | Hyper`
  }
});
</script>

