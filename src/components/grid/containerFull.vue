<template>
  <div v-bind="$attrs" class="container-full">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "containerFluid"
}
</script>

<style scoped>
@tailwind components;
.container-full{
  @apply max-w-full ;
}
</style>