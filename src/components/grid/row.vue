<template>
  <div v-bind="$attrs" class="row"><slot/></div>
</template>

<script setup lang="ts">
const {colGap,rowGap}=defineProps<{
  colGap?:string,
  rowGap?:string
}>()
</script>

<style lang="scss" >
@tailwind components;
@layer components {
  .row{
    column-gap: v-bind(colGap);
    row-gap: v-bind(rowGap);
    display: flex;
    flex-wrap: wrap;
  }
}

</style>