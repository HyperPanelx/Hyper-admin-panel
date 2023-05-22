<template>
  <div class="flex gap-0.5 items-center my-0.5">
    <Icon @click="toggleCheckbox" size="1.2rem" :name="checkBoxFlag ? 'line-md:confirm-circle' : 'line-md:circle'" class="cursor-pointer text-gray-600" :class="{'!text-secondary-light-2':checkBoxFlag}"/>
    <span @click="toggleCheckbox" class="cursor-pointer text-[0.85rem] text-gray-600">{{label}}</span>
  </div>
</template>

<script setup lang="ts">
const props=defineProps<{
  modelValue:string,
  label:string
}>();
const emit=defineEmits<{
  (e:'update:modelValue',value:boolean):void
}>()
const checkBoxFlag=ref(false)

const toggleCheckbox = () => {
  checkBoxFlag.value=!checkBoxFlag.value
  emit('update:modelValue',checkBoxFlag.value)
}
</script>

<style scoped>

</style>