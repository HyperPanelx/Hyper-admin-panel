<template>
  <DefaultLayout>
    <VPreloader :on="showPreloaderFlag" />
    <router-view></router-view>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '../layouts/default.vue'
import VPreloader from '../components/global/VPreloader.vue'
import {usePreloader} from "../composables/usePreloader";
import {useDashboardStore} from "../composables/useStates";
const {showPreloaderFlag}=useDashboardStore()
usePreloader();
</script>

<style scoped>

</style>