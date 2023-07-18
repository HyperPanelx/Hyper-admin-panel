<template>
  <aside :class="{'v-shrink ':sidebarCollapseFlag,'v-grow':!sidebarCollapseFlag,'!p-0':windowWidth>500 && sidebarCollapseFlag}" class="sidebar ">
   <SidebarBrand />
   <SidebarContent />
   <SidebarVersion/>
  </aside>
  <VShadow class="sm:hidden" v-model="dashboardStore.sidebarCollapseFlag"/>
</template>

<script setup lang="ts">
import  SidebarBrand from '../Sidebar/Brand.vue'
import  SidebarContent from '../Sidebar/Content.vue'
import SidebarVersion from '../Sidebar/Version.vue'
import VShadow from '../global/VShadow.vue'
import {useRouter} from "vue-router";
import {dashboardStore} from '../../store/dashboard'
import {useDashboardStore} from "../../composables/useStates";
const {sidebarCollapseFlag,windowWidth}=useDashboardStore()
const router=useRouter()
router.beforeResolve(()=>{
  if(windowWidth && windowWidth<500){
    dashboardStore.sidebarCollapseFlag=false
  }
})

</script>

<style scoped>

</style>