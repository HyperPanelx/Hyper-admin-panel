<template>
  <div v-click-outside="closeDropdown" v-bind="$attrs" class="dropdown-wrapper">
    <slot name="parent"></slot>
    <Transition name="slide">
      <div v-if="modelValue" :class="dropdownClass" class="dropdown">
        <slot name="content"/>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props=defineProps<{
  modelValue:boolean,
  height:string,
  minHeight:string,
  maxHeight:string,
  dropdownClass:string
}>();
const emit=defineEmits<{
  (e:'update:modelValue',value:boolean):void
}>()
const closeDropdown = () => {
  emit('update:modelValue',false)
}
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
  .dropdown{
    height: v-bind(height);
    min-height: v-bind(minHeight);
    max-height: v-bind(maxHeight);
  }
}
</style>