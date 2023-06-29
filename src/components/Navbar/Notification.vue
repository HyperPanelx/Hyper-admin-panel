<template>
  <VDropdown height="23rem" class="mr-1.8" dropdown-class="!w-[320px] dark:!bg-primary-dark-1 dark:!border-primary-dark-2/50 lg:!left-[-300px] !left-[-200px] !h-auto"  v-model="dropdownFlag">
    <template v-slot:parent>
      <span @click="dropdownFlag=!dropdownFlag" class="badge " :class="{'before:!opacity-0':!getNotificationData.length>0}">
          <font-awesome-icon  icon="fa-solid fa-bell" size="1.7rem" class=" navbar-icon"/>
      </span>
    </template>
    <template v-slot:content>
     <div class="px-0.8 py-1 flex justify-between border-b-[1px] border-b-gray-200 dark:border-primary-dark-2/30">
       <p class="text-gray-600 dark:text-primary-dark-3">Notification</p>
       <font-awesome-icon  @click="dropdownFlag=!dropdownFlag" class="text-gray-600 cursor-pointer relative  text-1.2 dark:text-primary-dark-3" icon="fa-solid fa-xmark" />
     </div>
      <div class="py-0.8 px-1.5 overflow-y-auto h-[16rem] scroller" :class="{'h-auto':!getNotificationData.length>0}">
        <p class="text-0.8 text-gray-400">Today</p>
        <template v-if="getNotificationData.length>0">
          <NavbarNotificationItem
              v-for="(item) in getNotificationData"
              :title="item.title"
              :msg="item.msg"
              :username="item.username"
              :link="{name:'USERS',query:{username:item.username}}"
              :theme="item.theme"
              :icon="item.icon"
          />
        </template>
        <p v-else class="text-0.8 text-gray-400 mt-1 text-center">There is not any Notification for today.</p>

      </div>
    </template>
  </VDropdown>

</template>

<script setup lang="ts">
import {ref,watch} from "vue";
import {useRoute} from "vue-router";
import {useDashboardStore} from "../../composables/useStates";
import  NavbarNotificationItem from './NotificationItem.vue'
import VDropdown from '../global/VDropdown.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
////////////////////////////////////////////////////////
const dropdownFlag=ref<boolean>(false);
const {getNotificationData}=useDashboardStore();
const route=useRoute()
watch(
    ()=>route.query,
    ()=>{
      dropdownFlag.value=false
    }
)


</script>

<style scoped>

</style>