<template>
  <client-only>
    <Teleport to="body">
      <div class="modal-wrapper"  @click.self="close" :class="modelValue ? '!z-[9999] opacity-100 visible':'!z-[-1] opacity-0 invisible'">
        <Transition name="translate">
          <div v-if="modelValue" v-bind="$attrs" class="modal " >
            <div  class="modal-header">
              <div class="flex gap-1 items-center">
                <nuxt-img class="w-2" provider="cloudinary" src="v1684354705/hyper/logo-lg_hqn9rt.png"/>
                <h5 class="text-gray-800 dark:text-primary-dark-3" > HYPER</h5>
              </div>
              <Icon @click="emit('update:modelValue',false)" size="1.5rem" class="text-gray-800 dark:text-primary-dark-3 cursor-pointer" name="heroicons-outline:x" />
            </div>
            <slot />
          </div>
        </Transition>
      </div>
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