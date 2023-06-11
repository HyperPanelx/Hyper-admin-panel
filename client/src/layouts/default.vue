<template>
  <main id="content-wrapper">
    <Navbar />
    <section id="main-content" :class="{'v-shrink':sidebarCollapseFlag,'v-grow':!sidebarCollapseFlag}">
      <Sidebar />
      <div class="relative px-1.5 py-2">
        <slot />
      </div>
    </section>
    <Footer/>
  </main>
</template>

<script setup lang="ts">
import Navbar from '../components/layout/Navbar.vue';
import Sidebar from '../components/layout/Sidebar.vue';
import Footer from '../components/layout/Footer.vue'
import {useDashboardStore} from "../composables/useStates";
const {sidebarCollapseFlag}=useDashboardStore()

</script>

<style scoped lang="css">


</style>