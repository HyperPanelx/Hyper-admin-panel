<template>
  <div class="mt-2">
    <p v-if="windowWidth>500 ? !sidebarCollapseFlag : true" class="text-primary-dark-2 font-500 uppercase text-0.8">
      Navigation
    </p>
    <ul class="mt-2 mb-1 flex flex-col " :class="{'gap-2':windowWidth>500 ? !sidebarCollapseFlag : true}">
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
  </div>
</template>

<script setup lang="ts">
import  SidebarItemClose from './ItemClose.vue'
import SidebarItemOpen from './ItemOpen.vue'
import {useDashboardStore} from "../../composables/useStates";
import {sidebarItemData} from "../../utils/Helper";
const {sidebarCollapseFlag,windowWidth}=useDashboardStore()

</script>

<style scoped>

</style>