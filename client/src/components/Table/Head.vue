<template>
  <thead class="bg-primary-dark-1 dark:bg-primary-dark-2/50 text-primary-light-1 text-left font-500">
  <tr  class="w-full">
    <th></th>
    <th class=" capitalize cursor-pointer  py-1.5 pr-0.5 first:pl-1 pl-0.5" v-for="item in titles">
      <div >
        <p class="text-0.9 text-center"> {{item}}</p>
      </div>
    </th>
  </tr>
  </thead>
</template>

<script setup>
const props=defineProps(['titles'])
</script>

<style scoped>

</style>