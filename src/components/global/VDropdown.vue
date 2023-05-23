<template>
  <div v-bind="$attrs" class="dropdown-wrapper">
    <slot name="parent"></slot>
    <Transition name="slide">
      <div v-if="on" class="dropdown">
        <slot name="content"/>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props=defineProps<{
  on:boolean
}>()
</script>

<style scoped>
@tailwind components;
@layer components {
  .slide-enter-active,.slide-leave-active{
    @apply transition-all duration-[200ms] ease-in-out
  }
  .slide-enter-from,.slide-leave-to{
    @apply top-[180%] opacity-0 invisible
  }
  .slide-enter-to,.slide-leave-from {
    @apply top-[154%] opacity-100 visible
  }
}
</style>