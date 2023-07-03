<template>
    <div class="shadow-card overflow-hidden rounded-10 bg-primary-light-1 dark:bg-[rgb(70,79,91)]">
       <div class="card-title ">
          <span v-if="title" class="uppercase dark:text-primary-light-1 font-500 tracking-widest text-primary-dark text-[0.87rem]" v-html="title">
          </span>
         <span v-else class="uppercase dark:text-primary-light-1 font-500 tracking-widest text-primary-dark text-[0.87rem]">
            <slot name="title" />
          </span>

       </div>
      <div v-if="title" class="card_body dark:bg-[#37404a] p-1" :class="bodyClass">
          <slot />
      </div>
      <div v-else class="card_body dark:bg-[#37404a] p-1" :class="bodyClass">
        <slot name="body"/>
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