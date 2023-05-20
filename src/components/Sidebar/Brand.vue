<template>
  <div class="sidebar-brand" :class="{'p-1':sidebarCollapseFlag}">
    <NuxtLink :to="{name:'DASHBOARD'}">
      <div class="flex gap-1 items-center">
        <nuxt-img class="sidebar-brand-image" provider="cloudinary" src="v1684354705/hyper/logo-lg_hqn9rt.png"/>
        <p v-if="windowWidth>500 ? !sidebarCollapseFlag : true" class="sidebar-brand-title">
          HYPER
        </p>
      </div>
    </NuxtLink>
    <Icon @click="closeSidebar" size="1.5rem" class="sidebar-close-icon" name="heroicons-outline:x" />
  </div>
</template>

<script setup lang="ts">
const {sidebarCollapseFlag,windowWidth}=useStates()
const closeSidebar = () => {
  sidebarCollapseFlag.value=false
}

</script>

<style scoped>

</style>