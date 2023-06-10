<template>
  <VTooltip content="Edit" inner-class="!w-3 !right-[-2px] !bg-primary-dark-1/70">
    <router-link :to="{name:'EDIT_USER',query:{username:user}}"  class=" btn-rose btn-operation">
      <font-awesome-icon class="text-1.3 text-primary-light-1" icon="fa-regular fa-pen-to-square" />
    </router-link>
  </VTooltip>
</template>

<script setup lang="ts">
const props=defineProps<{uid:number,user:string}>();
import VTooltip from '../global/VTooltip.vue'

</script>

<style scoped>
@tailwind components;
@layer components {
  .btn-operation{
    @apply  w-[2.8rem] h-[2.8rem] !flex !justify-center !items-center transition-all
  }
}
</style>