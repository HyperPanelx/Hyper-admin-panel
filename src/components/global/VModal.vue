<template>
  <client-only>
    <Teleport to="body">
      <div class="modal-wrapper"  @click.self="close" :class="modelValue ? '!z-[99] opacity-100':'!z-[-1] opacity-0'">
        <Transition name="translate">
          <div v-if="modelValue" v-bind="$attrs" class="modal " >
            <slot />
          </div>
        </Transition>
      </div>

<!--      <div v-fade:[350,99]="modelValue"  @click.self="close" class="modal-backdrop"></div>-->
    </Teleport>
  </client-only>
</template>

<script setup lang="ts">
const props=defineProps<{
  modelValue:boolean,
  fadeOutside?:boolean
}>();
const emit=defineEmits<{
  (e:'update:modelValue',value:boolean):void
}>();
const close = () => {
  if(props.fadeOutside){
    emit('update:modelValue',false)
  }
}



</script>

<style scoped>

</style>