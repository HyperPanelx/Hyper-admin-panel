<template>
  <aside :class="{'v-shrink':sidebarCollapseFlag,'v-grow':!sidebarCollapseFlag}" class="sidebar bg-red-600 h-[200px]">
    sidebar
    <Icon @click="closeSidebar" size="2rem" class="cursor-pointer sm:!hidden" name="ci:close-small" color="black"/>




  </aside>
  <VShadow class="sm:hidden" v-model="sidebarCollapseFlag"/>
</template>

<script setup lang="ts">
const {sidebarCollapseFlag}=useStates()
const closeSidebar = () => {
  sidebarCollapseFlag.value=false
}

</script>

<style scoped>

</style>