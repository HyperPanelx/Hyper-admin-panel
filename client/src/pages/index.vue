<template>
  <DefaultLayout>
    <VPreloader :on="showPreloaderFlag" />
    <router-view></router-view>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '../layouts/default.vue'
import VPreloader from '../components/global/VPreloader.vue'
import {useDashboardStore} from "../composables/useStates";
const {showPreloaderFlag}=useDashboardStore();
</script>

<style scoped>

</style>