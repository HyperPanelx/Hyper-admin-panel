<template>
  <div class="input-wrapper">
    <label :for="label">
      {{label}}
    </label>
    <input ref="input" :class="{'!border-b-red-600':errorFlag}" :type="passwordIconToggleFlag ? 'text' : type" :placeholder="placeholder" class="v-trans-input" :id="label" @input="inputHandler($event)" :value="modelValue" type="text">
   <font-awesome-icon @click="passwordIconToggleFlag=!passwordIconToggleFlag" class="password-eye-icon w-1.5" v-if="type==='password'" size="1.5rem" :icon="passwordIconToggleFlag ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"/>
    <VTooltip v-if="rule" :innerClass="tooltipClass" :content="rule" class="!absolute right-0 cursor-pointer" :class="{'right-[30px]':type==='password'}" >
      <font-awesome-icon v-if="errorFlag"   size="1.5rem" class="error-icon w-1.5" icon="fa-solid fa-circle-exclamation"/>
    </VTooltip>
    <font-awesome-icon v-if="errorFlag && !rule" :class="{'right-[30px]':type==='password'}"   size="1.5rem" class="error-icon w-1.5 absolute right-0" icon="fa-solid fa-circle-exclamation"/>
  </div>
</template>

<script setup lang="ts">
import VTooltip from './VTooltip.vue'
import {onMounted,ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const passwordIconToggleFlag=ref<boolean>(false)
const errorFlag=ref<boolean>(false)
const input=ref<HTMLInputElement|null>(null)
const props=defineProps<{
  modelValue:string,
  label:string,
  placeholder:string,
  type:string,
  regex:any,
  rule:string,
  tooltipClass:string
}>();
const emit=defineEmits<{
  (e:'update:modelValue',value:string):void
}>();
onMounted(()=>{
  if(input.value){
    emit('update:modelValue',input.value.value)
  }
})
const inputHandler = (e:Event) => {
  const el=e.target as HTMLInputElement
  emit('update:modelValue',el.value)
  if(el.value.match(props.regex)){
    errorFlag.value=false
  }else{
    errorFlag.value=true
  }
}


</script>

<style scoped>

</style>