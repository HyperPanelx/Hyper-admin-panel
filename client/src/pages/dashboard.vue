<template>
  {{isLogin}}{{username}}{{token}}
</template>

<script setup lang="ts">
import {useAuthStore} from "../composables/useStates";
const {isLogin,username,token}=useAuthStore()

</script>

<style scoped>

</style>