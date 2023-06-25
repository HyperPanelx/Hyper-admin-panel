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
import {watch} from "vue";
const {showPreloaderFlag,dashboardStore}=useDashboardStore();
watch(
    ()=>dashboardStore.showPreloaderFlag,
    ()=>{
      if(dashboardStore.showPreloaderFlag){
        document.body.style.overflowY='hidden'
      }else{
        document.body.style.overflowY='auto'
      }
    }
)

</script>

<style scoped>

</style>