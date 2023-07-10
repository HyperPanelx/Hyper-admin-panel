<template>
  <footer class="footer" :class="{'n-collapse':sidebarCollapseFlag,'!mt-[250px]':$route.name==='NotFound'}">
    <p class="text-gray-500 dark:text-primary-dark-3 sm:mb-0 mb-1">&copy;Copyright {{currentYear}}. All right is reserved.</p>
    <p class="text-gray-500 dark:text-primary-dark-3">Designed and developed by Hooman & Alireza</p>
  </footer>
</template>

<script setup lang="ts">
import {useDashboardStore} from "../../composables/useStates";
import {currentYear} from "../../utils/Helper";
const {sidebarCollapseFlag}=useDashboardStore();

</script>

<style scoped>
@tailwind components;
@layer components {
  .footer{
    @apply p-1.5 !pr-2 sm:ml-[260px] sm:w-[calc(100vw-260px)] transition-all shadow-[0_0_30px_rgba(0,0,0,0.1)] flex sm:flex-row flex-col justify-between items-center bg-primary-light-1 dark:bg-primary-dark-1 mt-[15px]
  }
  .footer.n-collapse{
    @apply sm:!ml-[70px] sm:!w-auto
  }
}
</style>