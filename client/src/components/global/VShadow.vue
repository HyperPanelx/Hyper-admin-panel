<template>
  <teleport to="body">
    <div @click.self="close" v-bind="$attrs" v-fade:[250,49]="modelValue" class="backdrop-shadow"></div>
  </teleport>
</template>

<script setup >
const props=defineProps(['modelValue']);
const emit=defineEmits(['update:modelValue']);
const close = () => emit('update:modelValue',false)

</script>

<style scoped>

</style>