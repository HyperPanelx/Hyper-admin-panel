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
import {useRouteLoader} from "../composables/useRouteLoader";
const {showPreloaderFlag,dashboardStore}=useDashboardStore();
useRouteLoader()
</script>

<style scoped>

</style>