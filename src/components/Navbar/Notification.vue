<template>
  <VDropdown height="23rem" dropdown-class="w-[320px] !left-[-320px]" v-model="openDropdownFlag">
    <template v-slot:parent>
      <span @click="openDropdownFlag=!openDropdownFlag" class="badge " >
          <Icon  name="ep:bell-filled" size="1.7rem" class=" navbar-icon"/>
      </span>
    </template>
    <template v-slot:content>
     <div class="px-0.8 py-1 flex justify-between border-b-[1px] border-b-gray-200">
       <p class="text-gray-600">Notification</p>
        <p class="text-0.8 text-gray-800 underline cursor-pointer">Clear All</p>
     </div>
      <div class="py-0.8 px-1.5 overflow-y-auto h-[16rem]">
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
       <NuxtLink :to="{name:'DASHBOARD'}" class="block w-full h-full  flex justify-center items-center">
         <p class="text-secondary-light-2">View All</p>
       </NuxtLink>
      </div>
    </template>
  </VDropdown>

</template>

<script setup lang="ts">
import { fakeTodayNotificationData,fakeYesterdayNotificationData} from "~/utils/Data";
const openDropdownFlag=ref<boolean>(false)
const fakeTodayNotification=ref(fakeTodayNotificationData)
const fakeYesterdayNotification=ref(fakeYesterdayNotificationData)

</script>

<style scoped>

</style>