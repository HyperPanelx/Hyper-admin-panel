<template>
  <NuxtLayout><NuxtPage/></NuxtLayout>
</template>
<script setup lang="ts">
const route=useRoute()
useHead({
  titleTemplate(){
    return `${(route.path.charAt(1).toUpperCase()+route.path.slice(2)).split('-').join(' ')} | Hyper`
  }
})


</script>
