<template>
  {{isLogin}}{{username}}
</template>

<script setup lang="ts">
import {useAuthStore} from "../composables/useStates";
const {isLogin,username}=useAuthStore()

</script>

<style scoped>

</style>