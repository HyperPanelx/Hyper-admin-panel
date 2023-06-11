<template>
  <div class="flex  items-center my-0.5">
    <font-awesome-icon @click="toggleCheckbox" size="1.2rem" :icon="checkBoxFlag ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'" class="cursor-pointer mr-0.5 text-gray-600" :class="{'!text-secondary-light-2':checkBoxFlag}"/>
    <span @click="toggleCheckbox" class="cursor-pointer text-[0.85rem] text-gray-600">{{label}}</span>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const props=defineProps<{
  modelValue:string,
  label:string
}>();
const emit=defineEmits<{
  (e:'update:modelValue',value:boolean):void
}>()
const checkBoxFlag=ref(false);

const toggleCheckbox = () => {
  checkBoxFlag.value=!checkBoxFlag.value
  emit('update:modelValue',checkBoxFlag.value)
}
</script>

<style scoped>

</style>