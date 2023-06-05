<template>
  <teleport to="body">
    <div @click.self="close" v-bind="$attrs" v-fade:[250,49]="modelValue" class="backdrop-shadow"></div>
  </teleport>
</template>

<script setup lang="ts">
const props=defineProps<{
  modelValue:string
}>();
const emit=defineEmits<{
  (e:'update:modelValue',value:boolean):void
}>();
const close = () => emit('update:modelValue',false)

</script>

<style scoped>

</style>