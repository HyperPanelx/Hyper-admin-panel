<template>
  <button ref="btn" :data-style="animation">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import {ref,watchEffect} from "vue";
import * as Ladda from 'ladda';
const props=defineProps(['animation','duration','progress','loading'])
const btn=ref<HTMLButtonElement|null>(null)
watchEffect(()=>{
  if(btn.value){
    const ladda = Ladda.create(btn.value);
    if(props.loading){
        ladda.start()
    }else{
      ladda.stop()
    }
  }
})


</script>
