<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import {useAuth} from "./composables/useAuth";
useAuth();
</script>

<style scoped>

</style>