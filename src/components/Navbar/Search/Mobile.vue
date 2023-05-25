<template>
  <VDropdown dropdown-class="!w-22 !overflow-visible p-1 dark:bg-primary-dark-1 z-[20] dark:border-primary-dark-3/20 !left-[-10rem]" class="lg:hidden block" v-model="openDropdownFlag">
    <template v-slot:parent>
      <Icon @click="openDropdownFlag=!openDropdownFlag" class="navbar-icon" name="ri:search-2-line" size="1.7rem"/>
    </template>
    <template v-slot:content>
      <NavbarSearchDesktop class="!flex lg:!hidden " v-model="openNavbarDropdownFlag"/>
    </template>
  </VDropdown>
</template>
<script setup lang="ts">
const openDropdownFlag=ref(false)
const {openNavbarDropdownFlag}=useStates()
</script>

<style scoped>

</style>