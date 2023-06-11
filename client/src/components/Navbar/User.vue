<template>
  <VDropdown @click="dropdownFlag=!dropdownFlag"
             v-model="dropdownFlag"
             top-start="112%"
             top-end="102%"
             dropdown-class="!top-[102%] dark:bg-primary-dark-1 !left-[-200%] lg:w-full lg:!left-0 sm:left-[-130%] md:left-[-120%] !w-11 dark:!border-primary-dark-2/50"
             class="bg-gray-100/50 p-0.5 !mr-2 ml-1.8 dark:bg-[#3c4655]  flex items-center gap-0.5 lg:w-17 w-6  cursor-pointer group lg:justify-start justify-center border-x-primary-dark-3/10 border-x-[1px]"
  >
    <template v-slot:parent>
      <img width="40"  src="../../public/profiles/profile_1.svg"/>
      <div class="lg:block hidden">
        <p class="group-hover:text-secondary-light-2 text-0.9 w-7 text-gray-700 capitalize font-600 text-hidden dark:text-primary-dark-2 dark:group-hover:text-[#bccee4]" v-if="username">{{username}}</p>
        <p class="group-hover:text-secondary-light-2 text-0.7 text-gray-600 mt-0.5 dark:text-primary-dark-2 dark:group-hover:text-[#bccee4]">
          Admin
        </p>
      </div>
    </template>
    <template v-slot:content>
        <p class="text-gray-600 text-0.7 p-0.5 font-600 dark:text-primary-dark-3">Welcome!</p>
      <ul>
        <li >
          <router-link class="flex  px-1 items-center py-0.7 hover:bg-gray-100/50 dark:hover:bg-primary-dark-2/20" :to="{name:'SETTINGS'}">
            <font-awesome-icon class="text-gray-700 mr-0.7 dark:text-primary-dark-3" icon="fa-solid fa-gear"/>
            <p class="text-0.8 text-gray-700 dark:text-primary-dark-3">Settings</p>
          </router-link>
        </li>
        <li @click="logoutHandler" class="flex  px-1 items-center py-0.7 hover:bg-gray-100/50 dark:hover:bg-primary-dark-2/20">
          <font-awesome-icon class="text-gray-700 mr-0.7 dark:text-primary-dark-3" icon="fa-solid fa-arrow-right-from-bracket"/>
          <p class="text-0.8 text-gray-700 dark:text-primary-dark-3">Logout</p>
        </li>
      </ul>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import {ref} from "vue";
import VDropdown from '../global/VDropdown.vue'
import {useLogout} from "../../composables/useLogout";
import {useAuthStore} from "../../composables/useStates";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const {username}=useAuthStore();
const {logoutHandler}=useLogout();
const dropdownFlag=ref<boolean>(false);
</script>

<style scoped>

</style>