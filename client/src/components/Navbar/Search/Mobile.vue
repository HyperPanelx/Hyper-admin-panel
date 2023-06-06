<template>
  <VDropdown dropdown-class="!w-22 !overflow-visible p-1 dark:bg-primary-dark-1 z-[20] dark:border-primary-dark-3/20 !left-[-10rem]" class="lg:hidden block" v-model="openDropdownFlag">
    <template v-slot:parent>
      <font-awesome-icon  @click="openDropdownFlag=!openDropdownFlag" class="navbar-icon" icon="fa-solid fa-magnifying-glass" size="1.7rem"/>
    </template>
    <template v-slot:content>
      <NavbarSearchDesktop class="!flex lg:!hidden " v-model="openNavbarDropdownFlag"/>
    </template>
  </VDropdown>
</template>
<script setup lang="ts">
import {ref} from "vue";
import NavbarSearchDesktop from './Desktop.vue'
import VDropdown from '../../global/VDropdown.vue'
import {useDashboardStore} from "../../../composables/useStates";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const {openNavbarDropdownFlag}=useDashboardStore()
const openDropdownFlag=ref(false);
</script>

<style scoped>

</style>