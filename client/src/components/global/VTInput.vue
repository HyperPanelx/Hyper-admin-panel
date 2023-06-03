<template>
  <div class="input-wrapper">
    <label :for="label">
      {{label}}
    </label>
    <input ref="input" :class="{'!border-b-red-600':errorFlag}" :type="passwordIconToggleFlag ? 'text' : type" :placeholder="placeholder" class="v-trans-input" :id="label" @input="inputHandler($event)" :value="modelValue" type="text">
   <Icon @click="passwordIconToggleFlag=!passwordIconToggleFlag" class="password-eye-icon" v-if="type==='password'" size="1.5rem" :name="passwordIconToggleFlag ? 'mdi:eye' : 'mdi:eye-off'"/>
    <VTooltip :content="rule" class="absolute right-0 cursor-pointer" :class="{'right-[30px]':type==='password'}" >
      <Icon v-if="errorFlag"   size="1.5rem" class="error-icon" name="ri:error-warning-line"/>
    </VTooltip>
  </div>
</template>

<script setup lang="ts">
const input=ref<HTMLInputElement|null>(null)
const props=defineProps<{
  modelValue:string,
  label:string,
  placeholder:string,
  type:string,
  regex:any,
  rule:string
}>();
onMounted(()=>{
  if(input.value){
    emit('update:modelValue',input.value.value)
  }
})

const emit=defineEmits<{
  (e:'update:modelValue',value:string):void
}>()
const passwordIconToggleFlag=ref<boolean>(false)
const errorFlag=ref<boolean>(false)
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