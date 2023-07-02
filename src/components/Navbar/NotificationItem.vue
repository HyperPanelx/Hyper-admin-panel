<template>

  <AppLink class="block relative" :href="link">
    <div class="notification-item group">
            <span :class="{'!bg-red-500':status==='danger','!bg-amber-500':status==='warning','!bg-blue-500':status==='news'}" class="notification-icon-wrapper ">
              <font-awesome-icon :icon="status==='danger' ? 'fa-solid fa-circle-exclamation' : status==='warning' ? 'fa-solid fa-triangle-exclamation' : status==='news' ?  'fa-regular fa-envelope' : null" />
            </span>
      <div class="w-11">
        <p class="text-gray-600 font-500 text-0.8 group-hover:text-primary-dark-1 dark:text-primary-dark-3 dark:group-hover:text-primary-light-1 flex items-center justify-between">
          {{title}}
          <span v-if="username" class="text-gray-400 text-0.7 inline-block text-hidden w-3" :title="username">{{username}}</span>
        </p>
        <p class="text-gray-400 dark:text-primary-dark-2 text-0.7  w-[180px] leading-[1.2] mt-0.5">
          {{msg}}
        </p>
      </div>
    </div>
  </AppLink>

</template>

<script setup lang="ts">
import AppLink from '../global/AppLink.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const props=defineProps<{
  title:string
  msg:string
  link:object|string,
  username?:string,
  status:'warning' | 'news' | 'danger'

}>();

</script>

<style scoped>

</style>