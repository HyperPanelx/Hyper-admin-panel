<template>
  <VDropdown height="23rem" dropdown-class="!w-[320px] dark:!bg-primary-dark-1 dark:!border-primary-dark-2/50 lg:!left-[-300px] !left-[-200px]" v-model="dropdownFlag">
    <template v-slot:parent>
      <span @click="dropdownFlag=!dropdownFlag" class="badge " >
          <font-awesome-icon  icon="fa-solid fa-bell" size="1.7rem" class=" navbar-icon"/>
      </span>
    </template>
    <template v-slot:content>
     <div class="px-0.8 py-1 flex justify-between border-b-[1px] border-b-gray-200 dark:border-primary-dark-2/30">
       <p class="text-gray-600 dark:text-primary-dark-3">Notification</p>
        <p class="text-0.8 text-gray-800 underline cursor-pointer dark:text-primary-light-1">Clear All</p>
     </div>
      <div class="py-0.8 px-1.5 overflow-y-auto h-[16rem] scroller">
        <p class="text-0.8 text-gray-400">Today</p>
        <NavbarNotificationItem
            v-for="(item,index) in fakeTodayNotification"
            :sender="item.sender"
            :content="item.content"
            :time="item.time"
            :link="item.link"
            :index="index"
            v-model="fakeTodayNotification"
        />
        <p class="text-0.8 text-gray-400 mt-1">Yesterday</p>
        <NavbarNotificationItem
            v-for="(item,index) in fakeYesterdayNotification"
            :sender="item.sender"
            :content="item.content"
            :time="item.time"
            :link="item.link"
            :index="index"
            v-model="fakeYesterdayNotification"
        />
      </div>
      <div class="notification-bottom">
       <router-link :to="{name:'DASHBOARD'}" class="block w-full h-full  flex justify-center items-center">
         <p class="text-secondary-light-2">View All</p>
       </router-link>
      </div>
    </template>
  </VDropdown>

</template>

<script setup lang="ts">
import {ref} from "vue";
import  NavbarNotificationItem from './NotificationItem.vue'
import VDropdown from '../global/VDropdown.vue'
import { fakeTodayNotificationData,fakeYesterdayNotificationData} from "../../utils/Data";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const fakeTodayNotification=ref(fakeTodayNotificationData)
const fakeYesterdayNotification=ref(fakeYesterdayNotificationData)
const dropdownFlag=ref<boolean>(false)

</script>

<style scoped>

</style>