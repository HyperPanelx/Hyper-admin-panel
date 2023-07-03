<template>
  <DefaultLayout>
    <VPreloader :on="showPreloaderFlag" :freeze="serverStore.freezeAppFlag" />
    <router-view></router-view>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '../layouts/default.vue'
import VPreloader from '../components/global/VPreloader.vue'
import {useDashboardStore,useServerStore} from "../composables/useStates";
import {useRouteLoader} from "../composables/useRouteLoader";
import {onMounted} from "vue";
const {showPreloaderFlag,dashboardStore}=useDashboardStore();
const {serverStore}=useServerStore();
onMounted(()=>{
  //// fetching servers list on app start
  serverStore.fetchServersList()
})
useRouteLoader();
</script>

<style scoped>

</style>