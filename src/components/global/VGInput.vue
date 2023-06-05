<template>
  <div v-bind="$attrs" class=" input-gray-wrapper">
    <font-awesome-icon v-if="icon" size="1.4rem" :icon="icon" class="search-input-icon w-1.4"/>
    <input ref="input"
           @focus="focusHandler"
           @blur="blurHandler"
           v-on="handlers"
           :value="modelValue"
           :placeholder="placeholder"
           type="text"
           class="v-input-rest v-gray-input"
           :class="[{'!pl-2.5':icon},inputClass]"
    >
  </div>
</template>

<script setup lang="ts">
import {onMounted,ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const input=ref<HTMLInputElement|null>(null)
const props=defineProps<{
  placeholder:string,
  icon:string,
  modelValue:string,
  delay:boolean,
  timer?:number,
  inputClass:string
}>();
const emit=defineEmits<{
  (e:'update:modelValue',value:string):void,
  (e:'on',value:boolean):void,
  (e:'search'):void
}>()
onMounted(()=>{
  if(input.value){
    emit('update:modelValue',input.value.value)
  }
})

let timeout:any=null

const inputDelayHandler = () => {
  if(timeout){
    clearTimeout(timeout)
  }
  timeout=setTimeout(()=>{
    if(input.value){
      emit('update:modelValue',input.value.value)
      emit('search')
    }
  },props.timer)
}


const inputHandler = () => {
  if(input.value){
    emit('update:modelValue',input.value.value)
    emit('search')
  }
}

const focusHandler = () => {
  emit('on',true)
}
const blurHandler = () => {
  emit('on',false)
}

const handlers ={
  input:props.delay ? inputDelayHandler : inputHandler
}

</script>

<style scoped>

</style>