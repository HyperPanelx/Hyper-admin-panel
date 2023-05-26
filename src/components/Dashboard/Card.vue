<template>
  <div class="card p-1.3">
    <div class="flex justify-between items-start">
      <div>
        <span class="font-700 text-[0.9rem] text-primary-dark-1 dark:text-primary-light-1">{{title}}</span>
        <h3 class="font-700" :class="$textColor(theme)">{{number}}</h3>
      </div>
      <span class="icon-wrapper !h-3 !w-3" :class="$bgColor(theme)">
                    <Icon name="mdi:account-supervisor" size="1.5rem" :class="$textColor(theme)"></Icon>
                  </span>
    </div>
    <div>
      <span class="text-gray-700 text-0.75 dark:text-gray-200">{{new Date().toDateString()}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const {$textColor,$bgColor}=useNuxtApp()
let props=defineProps(['title', 'number', 'theme'])


</script>

