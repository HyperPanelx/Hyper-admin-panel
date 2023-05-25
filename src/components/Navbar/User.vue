<template>
  <VDropdown @click="openNavbarDropdownFlag=!openNavbarDropdownFlag"
             v-model="openNavbarDropdownFlag"
             dropdown-class="!top-[102%] dark:bg-primary-dark-1 !left-[-200%] lg:w-full lg:!left-0 sm:left-[-130%] md:left-[-120%] !w-11 dark:!border-primary-dark-2/50"
             class="bg-gray-100/50 p-0.5 mr-1 ml-1.8 dark:bg-[#3c4655]  flex items-center gap-0.5 lg:w-17 w-6  cursor-pointer group lg:justify-start justify-center border-x-primary-dark-3/10 border-x-[1px]"
  >
    <template v-slot:parent>
      <nuxt-img width="40"  provider="cloudinary" src="v1684870684/hyper/profile_1_xe7zxp.svg"/>
      <div class="lg:block hidden">
        <p class="group-hover:text-secondary-light-2 text-0.9 w-7 text-gray-700 capitalize font-600 text-hidden dark:text-primary-dark-2 dark:group-hover:text-[#bccee4]" v-if="userInformation">{{userInformation.firstname}} {{userInformation.lastname}}</p>
        <p class="group-hover:text-secondary-light-2 text-0.7 text-gray-600 mt-0.5 dark:text-primary-dark-2 dark:group-hover:text-[#bccee4]">
          Admin
        </p>
      </div>
    </template>
    <template v-slot:content>
        <p class="text-gray-600 text-0.7 p-0.5 font-600 dark:text-primary-dark-3">Welcome!</p>
      <ul>
        <li >
          <NuxtLink class="flex gap-0.7 px-1 items-center py-0.7 dark:hover:bg-primary-dark-2/20 hover:bg-gray-100/50" :to="{name:'DASHBOARD'}">
            <Icon class="text-gray-700 dark:text-primary-dark-3" name="solar:user-bold"/>
            <p class="text-0.8 text-gray-700 dark:text-primary-dark-3">My Account</p>
          </NuxtLink>
        </li>
        <li >
          <NuxtLink class="flex gap-0.7 px-1 items-center py-0.7 hover:bg-gray-100/50 dark:hover:bg-primary-dark-2/20" :to="{name:'DASHBOARD'}">
            <Icon class="text-gray-700 dark:text-primary-dark-3" name="solar:user-check-rounded-linear"/>
            <p class="text-0.8 text-gray-700 dark:text-primary-dark-3">Settings</p>
          </NuxtLink>
        </li>
        <li @click="logoutHandler" class="flex gap-0.7 px-1 items-center py-0.7 hover:bg-gray-100/50 dark:hover:bg-primary-dark-2/20">
          <Icon class="text-gray-700 dark:text-primary-dark-3" name="solar:exit-bold"/>
          <p class="text-0.8 text-gray-700 dark:text-primary-dark-3">Logout</p>
        </li>
      </ul>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
const {userInformation}=useStates()
const {logoutHandler}=useLogout()
const {openNavbarDropdownFlag}=useStates()
</script>

<style scoped>

</style>