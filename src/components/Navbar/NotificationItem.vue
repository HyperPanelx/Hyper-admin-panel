<template>
  <NuxtLink  class="block relative" :to="link">
    <div class="notification-item group">
            <span class="notification-icon-wrapper">
              <Icon name="ep:message" />
            </span>
      <div class="w-11">
        <p class="text-gray-600 font-500 text-0.8 group-hover:text-primary-dark-1">
          {{sender}}
          <span class="text-gray-400 text-0.7 ml-1 inline-block">{{time}}</span>
        </p>
        <p class="text-gray-400 text-0.8 text-hidden w-[180px]">
          {{content}}
        </p>
      </div>
      <Icon @click="removeNotification" size="0.8rem" class="cursor-pointer m-0.5 text-gray-400  absolute right-0 top-0 z-[20]" name="heroicons-outline:x"  />
    </div>

  </NuxtLink>

</template>

<script setup lang="ts">

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