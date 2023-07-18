<template>
  <div class="sidebar-brand" :class="{'p-1':sidebarCollapseFlag,'!p-1':windowWidth<500}">
    <router-link :to="{name:'DASHBOARD'}">
      <div class="flex = items-center">
        <img class="sidebar-brand-image mr-1" :src="logoLg" alt="logo"/>
        <p v-if="windowWidth>500 ? !sidebarCollapseFlag : true" class="sidebar-brand-title">
          HYPER
        </p>
      </div>
    </router-link>
    <font-awesome-icon @click="closeSidebar" size="1.5rem" class="sidebar-close-icon " icon="fa-solid fa-xmark" />
  </div>
</template>

<script setup lang="ts">
import logoLg from '../../public/logo-lg.png'
import {useDashboardStore} from "../../composables/useStates";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {dashboardStore} from "../../store/dashboard";
const {sidebarCollapseFlag,windowWidth}=useDashboardStore()
const closeSidebar = () => {
  dashboardStore.sidebarCollapseFlag=false
}

</script>

<style scoped>

</style>