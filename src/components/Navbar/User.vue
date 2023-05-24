<template>
  <VDropdown @click="openDropdownFlag=true" v-model="openDropdownFlag" dropdown-class="!top-[102%]" class="bg-gray-100/50 p-0.5 mr-1 ml-1.8 dark:bg-[#3c4655]  flex items-center gap-0.5 w-18 cursor-pointer group">
    <template v-slot:parent>
      <nuxt-img width="40" provider="cloudinary" src="v1684870684/hyper/profile_1_xe7zxp.svg"/>
      <div>
        <p class="group-hover:text-secondary-light-2 text-0.9 w-7 text-gray-700 capitalize font-600 text-hidden dark:text-primary-dark-2 dark:group-hover:text-[#bccee4]" v-if="userInformation">{{userInformation.firstname}} {{userInformation.lastname}}</p>
        <p class="group-hover:text-secondary-light-2 text-0.7 text-gray-600 mt-0.5 dark:text-primary-dark-2 dark:group-hover:text-[#bccee4]">
          Admin
        </p>
      </div>
    </template>
    <template v-slot:content>
        <p class="text-gray-600 text-0.7 p-0.5 font-600">Welcome!</p>
      <ul>
        <li >
          <NuxtLink class="flex gap-0.7 px-1 items-center py-0.7 hover:bg-gray-100/50" :to="{name:'DASHBOARD'}">
            <Icon class="text-gray-700" name="solar:user-bold"/>
            <p class="text-0.8 text-gray-700">My Account</p>
          </NuxtLink>
        </li>
        <li >
          <NuxtLink class="flex gap-0.7 px-1 items-center py-0.7 hover:bg-gray-100/50" :to="{name:'DASHBOARD'}">
            <Icon class="text-gray-700" name="solar:user-check-rounded-linear"/>
            <p class="text-0.8 text-gray-700">Settings</p>
          </NuxtLink>
        </li>
        <li @click="logoutHandler" class="flex gap-0.7 px-1 items-center py-0.7 hover:bg-gray-100/50">
          <Icon class="text-gray-700" name="solar:exit-bold"/>
          <p class="text-0.8 text-gray-700">Logout</p>
        </li>
      </ul>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
const {userInformation}=useStates()
const {logoutHandler}=useLogout()
const openDropdownFlag=ref<boolean>(false)

</script>

<style scoped>

</style>