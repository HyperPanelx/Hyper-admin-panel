<template>
  <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Users',link:'USERS'},{name:'Create Single User'}]" />


</template>

<script setup lang="ts">
definePageMeta({
  name:'NEW_SINGLE_USER'
});
useHead({
  title:'User > Create > Single'
})
</script>

<style scoped>

</style>