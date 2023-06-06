<template>
  <teleport to="body">
    <div class="modal-wrapper"  @click.self="close" :class="modelValue ? '!z-[9999] opacity-100 visible':'!z-[-1] opacity-0 invisible'">
      <Transition name="translate">
        <div v-if="modelValue" v-bind="$attrs" class="modal " >
          <div  class="modal-header">
            <div class="flex gap-1 items-center">
              <img class="w-2"  src="../../public/logo-lg.png"/>
              <h5 class="text-gray-800 dark:text-primary-dark-3" > HYPER</h5>
            </div>
            <font-awesome-icon @click="emit('update:modelValue',false)" size="1.5rem" class="text-gray-800 dark:text-primary-dark-3 cursor-pointer w-1.5" icon="fa-solid fa-xmark" />
          </div>
          <slot />
        </div>
      </Transition>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

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