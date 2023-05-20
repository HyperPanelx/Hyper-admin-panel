<template>
  <div class="mt-2">
    <p v-if="windowWidth>500 ? !sidebarCollapseFlag : true" class="text-primary-dark-2 font-500 uppercase text-0.8">
      Navigation
    </p>
    <ul class="mt-2">
      <template v-if="sidebarCollapseFlag && windowWidth>500">
        <li v-for="item in sidebarItemData" class="sidebar-item-collapse group">
          <NuxtLink active-class="active" :to="{name:item.page}" class="sidebar-item-link sidebar-item-link-collapse">
            <Icon  size="1.5rem" :name="item.icon" />
            <span class="group-hover:opacity-100 group-hover:visible">
              {{item.title}}
            </span>
          </NuxtLink>
        </li>
      </template>
      <template v-else>
        <li v-for="item in sidebarItemData">
          <NuxtLink active-class="active" :to="{name:item.page}" class="sidebar-item-link">
            <Icon  class="text-primary-dark-2 " size="1.5rem" :name="item.icon" />
            <p v-if="windowWidth>500 ? !sidebarCollapseFlag : true" class="text-primary-dark-2">{{item.title}}</p>
          </NuxtLink>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {sidebarItemData} from "~/utils/Helper";
const {sidebarCollapseFlag,windowWidth}=useStates()

</script>

<style scoped>

</style>