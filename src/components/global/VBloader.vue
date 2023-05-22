<template>
  <button ref="btn" :data-style="animation">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import * as Ladda from 'ladda';
import 'ladda/dist/ladda-themeless.min.css'
const props=defineProps(['animation','duration','progress','loading'])
const btn=ref<HTMLButtonElement|null>(null)
watchEffect(()=>{
  if(btn.value){
    const ladda = Ladda.create(btn.value);
    if(props.loading){
      console.log('startttt')
        ladda.start()
    }else{
      ladda.stop()
    }
  }
})


</script>
