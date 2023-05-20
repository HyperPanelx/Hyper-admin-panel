<template>
  <aside :class="{'v-shrink ':sidebarCollapseFlag,'v-grow':!sidebarCollapseFlag,'p-0':windowWidth>500 && sidebarCollapseFlag}" class="sidebar ">
   <SidebarBrand />
   <SidebarContent />
  </aside>
  <VShadow class="sm:hidden" v-model="sidebarCollapseFlag"/>
</template>

<script setup lang="ts">
const {sidebarCollapseFlag,windowWidth}=useStates()

</script>

<style scoped>

</style>