<template>
  <div class="mt-2">
    <p v-if="windowWidth>500 ? !sidebarCollapseFlag : true" class="text-primary-dark-2 font-500 uppercase text-0.8">
      Navigation
    </p>
    <ul class="mt-2  flex flex-col " :class="{'[&_li]:mb-2':windowWidth>500 ? !sidebarCollapseFlag : true}">
      <li  v-if="sidebarCollapseFlag && windowWidth>500" v-for="row1 in sidebarItemData" class="sidebar-item-collapse group">
        <SidebarItemClose
            :icon="row1.icon"
            :title="row1.title"
            :link="row1.link"
            :hasSub="row1.hasSub"
            :sub="row1.sub"
        />
      </li>
      <li v-else v-for="row1 in sidebarItemData">
        <SidebarItemOpen
            :icon="row1.icon"
            :title="row1.title"
            :link="row1.link"
            :hasSub="row1.hasSub"
            :sub="row1.sub"
        />
      </li>
    </ul>
    <div v-if="windowWidth>500 && !sidebarCollapseFlag" class="mt-0.5 flex items-center pl-0.5">
      <span class="relative flex h-0.5 w-0.5 flex justify-center items-center">
          <span class="animate-ping-slow !w-1.7 !h-1.7 absolute inline-flex h-full w-full rounded-full bg-primary-dark-2 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-0.5 w-0.5 bg-primary-dark-2"></span>
      </span>
      <p class="text-primary-dark-2 text-0.8 ml-1">Active Server : {{getServerIP}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import  SidebarItemClose from './ItemClose.vue'
import SidebarItemOpen from './ItemOpen.vue'
import {useDashboardStore,useServerStore} from "../../composables/useStates";
import {sidebarItemData} from "../../utils/Helper";
const {sidebarCollapseFlag,windowWidth}=useDashboardStore()
const {getServerIP}=useServerStore()
</script>

<style scoped>



</style>