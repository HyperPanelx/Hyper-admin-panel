<template>
    <div class="shadow-card overflow-hidden rounded-10 bg-primary-light-1 dark:bg-primary-dark-1">
       <div class="card-title ">
          <span class="uppercase dark:text-primary-light-1 font-500 tracking-widest text-primary-dark text-[0.87rem]">{{title}}</span>
       </div>
      <div class="card_body dark:bg-secondary-dark-1 p-1" :class="bodyClass">
          <slot/>
      </div>
    </div>
</template>

<script setup lang="ts">
const props=defineProps<{
  title:string
  bodyClass:string|object
}>()

</script>

<style scoped>

</style>