<template>
  <VDropdown height="20rem" class="mr-1.8" dropdownClass="!w-[320px] dark:!bg-primary-dark-1 dark:!border-primary-dark-2/50 lg:!left-[-300px] !left-[-200px]"   v-model="dropdownFlag">
    <template v-slot:parent>
      <span @click="dropdownFlag=!dropdownFlag" class="badge " :class="{'before:!opacity-0':getNotificationData.length===0}">
          <font-awesome-icon  icon="fa-solid fa-bell" size="1.7rem" class=" navbar-icon"/>
      </span>
    </template>
    <template v-slot:content>
     <div class="px-0.8 py-1 flex justify-between border-b-[1px] border-b-gray-200 dark:border-primary-dark-2/30">
       <p class="text-gray-600 dark:text-primary-dark-3">Notification</p>
       <font-awesome-icon  @click="dropdownFlag=!dropdownFlag" class="text-gray-600 cursor-pointer relative  text-1.2 dark:text-primary-dark-3" icon="fa-solid fa-xmark" />
     </div>
      <div class="py-0.8 overflow-y-auto h-[17rem] scroller" :class="{'h-auto':getNotificationData.length===0}">
        <div class="px-1.5">
          <p class="text-0.8 text-gray-400">News</p>
          <template v-if="newsNotificationData.length>0">
            <NavbarNotificationItem
                v-for="(item) in newsNotificationData"
                :title="item.title"
                :msg="item.msg"
                :link="item.link"
                status="news"
            />
          </template>
          <p v-else class="text-0.7 text-gray-400 mt-1 text-center">There is not any News for today.</p>
        </div>

        <p class="w-full my-1 h-[2px] border-b-gray-300 border-[1px] border-dashed"></p>

        <div class="px-1.5">
          <p class="text-0.8 text-gray-400 mt-1">Warnings</p>
          <template v-if="warningNotificationData.length>0">
            <NavbarNotificationItem
                v-for="(item) in warningNotificationData"
                :title="item.title"
                :msg="item.msg"
                :username="item.username"
                :link="{name:'USERS',query:{username:item.username}}"
                status="warning"
            />
          </template>
          <p v-else class="text-0.7 text-gray-400 mt-1 text-center">There is not any Warnings for today.</p>
        </div>

        <p class="w-full my-1 h-[2px] border-b-gray-300 border-[1px] border-dashed"></p>

        <div class="px-1.5 pb-1">
          <p class="text-0.8 text-gray-400 mt-1">Immediate Actions</p>
          <template v-if="dangerNotificationData.length>0">
            <NavbarNotificationItem
                v-for="(item) in dangerNotificationData"
                :title="item.title"
                :msg="item.msg"
                :username="item.username"
                :link="{name:'USERS',query:{username:item.username}}"
                status="danger"
            />
          </template>
          <p v-else class="text-0.7 text-gray-400 mt-1 text-center">There is not any Immediate Actions for today.</p>
        </div>

      </div>
    </template>
  </VDropdown>

</template>

<script setup lang="ts">
import {useNotification} from "../../composables/useNotification";
import {useNotificationStore} from "../../composables/useStates";
import  NavbarNotificationItem from './NotificationItem.vue'
import VDropdown from '../global/VDropdown.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
////////////////////////////////////////////////////////
const {dropdownFlag}=useNotification();
const {warningNotificationData,newsNotificationData,dangerNotificationData,getNotificationData}=useNotificationStore()
</script>

<style scoped>

</style>