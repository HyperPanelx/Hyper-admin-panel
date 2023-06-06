<template>
  <router-link  class="block relative" :to="link">
    <div class="notification-item group">
            <span class="notification-icon-wrapper">
              <font-awesome-icon icon="fa-regular fa-envelope" />
            </span>
      <div class="w-11">
        <p class="text-gray-600 font-500 text-0.8 group-hover:text-primary-dark-1 dark:text-primary-dark-3 dark:group-hover:text-primary-light-1">
          {{sender}}
          <span class="text-gray-400 text-0.7 ml-1 inline-block">{{time}}</span>
        </p>
        <p class="text-gray-400 dark:text-primary-dark-2 text-0.8 text-hidden w-[180px]">
          {{content}}
        </p>
      </div>
      <font-awesome-icon @click="removeNotification" size="0.8rem" class="cursor-pointer m-0.5 text-gray-400  absolute right-0 top-0 z-[20] w-0.8" icon="fa-solid fa-xmark"  />
    </div>
  </router-link>

</template>

<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const props=defineProps<{
  sender:string
  content:string
  link:object,
  time:string,
  modelValue:any[],
  index:number
}>();
const emit=defineEmits<{
  (e:'update:modelValue',value:any):void
}>()
const removeNotification = () => {
  emit('update:modelValue',props.modelValue.splice(props.index,1))
}

</script>

<style scoped>

</style>