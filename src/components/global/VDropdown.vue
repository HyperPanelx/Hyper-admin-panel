<template>
  <div v-click-outside="closeDropdown" v-bind="$attrs" class="dropdown-wrapper">
    <slot name="parent"></slot>
    <Transition name="slide">
      <div v-if="modelValue || on" :class="dropdownClass" class="dropdown">
        <slot name="content"/>
      </div>
    </Transition>
  </div>
</template>

<script setup>

const props=defineProps({
  on:{
    required:false
  },
  modelValue:{
    required:false
  },
  height:{
     required:false,
  },
  minHeight:{
        required:false
  },
  maxHeight:{
        required:false
  },
  dropdownClass:{
    required:false
  },
  topStart:{
     required:false,
    default:'180%'
  },
  topEnd:{
    required:false,
    default:'154%'
  }
});

const emit=defineEmits(['update:modelValue','close'])
const closeDropdown = () => {
  emit('update:modelValue',false)
  emit('close',false)
}
</script>

<style scoped>
@tailwind components;
@layer components {
  .slide-enter-active,.slide-leave-active{
    @apply transition-all duration-[200ms] ease-in-out
  }
  .slide-enter-from,.slide-leave-to{
    top:v-bind(topStart) !important;
    @apply  opacity-0 invisible;
  }
  .slide-enter-to,.slide-leave-from {
    top:v-bind(topEnd) !important;
    @apply opacity-100 visible;
  }
  .dropdown{
    height: v-bind(height);
    min-height: v-bind(minHeight);
    max-height: v-bind(maxHeight);
  }
}
</style>