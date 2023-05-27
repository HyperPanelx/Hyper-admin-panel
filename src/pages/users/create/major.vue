<template>
  <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Users',link:'USERS'},{name:'Create Major Users'}]" />

</template>

<script setup lang="ts">
definePageMeta({
  name:'NEW_MAJOR_USER'
});
useHead({
  title:'User > Create > Major'
})
</script>

<style scoped>

</style>