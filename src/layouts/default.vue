<template>
  <main id="content-wrapper">
    <LayoutSidebar />
    <section id="main-content" :class="{'v-shrink':sidebarCollapseFlag,'v-grow':!sidebarCollapseFlag}">
      <LayoutNavbar />
      <div >
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