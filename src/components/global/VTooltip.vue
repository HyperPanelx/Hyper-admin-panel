<template>
  <div v-bind="$attrs" @mouseenter="tooltipFlag=true" @mouseleave="tooltipFlag=false" class="tooltip">
    <slot />
    <span v-if="tooltipFlag" class="tooltip-inner" v-html="content"></span>
  </div>
</template>

<script setup lang="ts">
const props=defineProps<{
  content:string,
}>();
const tooltipFlag=ref<boolean>(false)

</script>

<style scoped>

</style>