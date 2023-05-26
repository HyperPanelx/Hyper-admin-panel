<template>
  <main id="content-wrapper">
    <LayoutSidebar />
    <section id="main-content" :class="{'v-shrink':sidebarCollapseFlag,'v-grow':!sidebarCollapseFlag}">
      <LayoutNavbar />
      <div class="relative px-1.5 py-2">
        <slot />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const {sidebarCollapseFlag}=useStates()

</script>

<style scoped lang="css">


</style>