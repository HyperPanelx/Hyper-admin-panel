<template>
  <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Online Users'}]" />


</template>

<script setup lang="ts">
definePageMeta({
  name:'ONLINE',
  path:'/online'
})
</script>

<style scoped>

</style>