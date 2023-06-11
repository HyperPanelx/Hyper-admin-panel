<template>
  <VDropdown dropdown-class="!w-22 !overflow-visible p-1 dark:bg-primary-dark-1 z-[20] dark:border-primary-dark-3/20 !left-[-10rem]" class="lg:hidden block  mr-1.8" v-model="openDropdownFlag">
    <template v-slot:parent>
      <font-awesome-icon  @click="openDropdownFlag=!openDropdownFlag" class="navbar-icon relative bottom-[-3px]" icon="fa-solid fa-magnifying-glass" size="1.7rem"/>
    </template>
    <template v-slot:content>
      <NavbarSearchDesktop class="!flex lg:!hidden " v-model="openSearchDropdownFlag"/>
    </template>
  </VDropdown>
</template>
<script setup lang="ts">
import {ref} from "vue";
import NavbarSearchDesktop from './Desktop.vue'
import VDropdown from '../../global/VDropdown.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const openDropdownFlag=ref(false);
const openSearchDropdownFlag=ref<boolean>(false)
</script>

<style scoped>

</style>