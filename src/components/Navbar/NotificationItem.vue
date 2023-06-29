<template>
  <router-link  class="block relative" :to="link">
    <div class="notification-item group">
            <span :class="theme" class="notification-icon-wrapper">
              <font-awesome-icon :icon="icon" />
            </span>
      <div class="w-11">
        <p class="text-gray-600 font-500 text-0.8 group-hover:text-primary-dark-1 dark:text-primary-dark-3 dark:group-hover:text-primary-light-1">
          {{title}}
          <span class="text-gray-400 text-0.7 ml-1 inline-block text-hidden w-3" :title="username">{{username}}</span>
        </p>
        <p class="text-gray-400 dark:text-primary-dark-2 text-0.8  w-[180px]">
          {{msg}}
        </p>
      </div>
    </div>
  </router-link>

</template>

<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const props=defineProps<{
  title:string
  msg:string
  link:object,
  username:string,
  icon:string,
  theme:string,
}>();

</script>

<style scoped>

</style>