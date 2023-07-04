<template>
  <td>
    <div class="pl-0.5">
      <Check :user="user" />
    </div>
  </td>
  <td>
    <div class="p-1">
      <p class="text-center dark:text-primary-dark-3">
        {{uid}}
      </p>
    </div>
  </td>
  <td>
    <div class="p-1 flex justify-center items-center ">
      <font-awesome-icon class="dark:!text-primary-dark-3 mr-0.5 text-gray-700 text-0.8" icon="fa-solid fa-user"/>
      <p class=" dark:text-primary-light-1">{{user}}</p>
    </div>
  </td>
  <td>
    <div class="p-1">
      <p v-if="ip" class="text-center dark:text-primary-light-1">{{ip}}</p>
      <p v-else class="text-0.7 dark:text-primary-dark-3 text-gray-700 text-center">No Data.</p>
    </div>
  </td>
  <td>
    <Kill :user="user" :uid="uid" />
  </td>
  <td class="absolute top-0 left-0 w-full h-full z-[5]" @click="checkboxHandler" colspan="0"></td>

</template>

<script setup lang="ts">
import Check from './Check.vue'
import Kill from './Kill.vue'
import {useCheckBox} from "../../composables/online/useCheckBox";
const props=defineProps<{
  user:string,
  ip:string,
  index:number,
  uid:number
}>();
const {checkboxHandler}=useCheckBox(props)

</script>

<style scoped>

</style>