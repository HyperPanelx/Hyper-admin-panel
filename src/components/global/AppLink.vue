<template>
  <a v-bind="$attrs" v-if="isExternalLink" target="_blank" :href="href">
    <slot/>
  </a>
  <router-link v-bind="$attrs" :active-class="activeClass" :exact-active-class="exactActiveClass" :to="href" v-else>
    <slot/>
  </router-link>
</template>

<script setup lang="ts">
import {computed} from "vue";
const props=defineProps<{
  href:string|object
  activeClass?:string,
  exactActiveClass?:string
}>()

const isExternalLink=computed(()=>{
  return typeof props.href==='string' && props.href.startsWith('http')
})

</script>

<style scoped>

</style>