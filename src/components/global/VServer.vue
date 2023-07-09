<template>
  <select  @change="emit('fire',$event)" ref="selectEl" name="selectEl-dashboard" id="selectEl-dashboard"></select>
</template>

<script setup lang="ts">
import Choices from "choices.js";
import {useServerStore} from "../../composables/useStates";
import {onMounted, ref, watch} from "vue";
const selectEl=ref(null)
const {fetchServerListsFlag,getHostList,serverStore}=useServerStore()
const emit=defineEmits<{
  (e:'fire',value:any):void
}>();
////////////////////////////////////////////////////////
const initServerListSelect = () => {
  if(selectEl.value && fetchServerListsFlag.value) {
    const selectData=[...getHostList.value].map((item,index)=>{
      return {
        value:item,
        label:`<svg data-v-857834c0="" class="svg-inline--fa fa-server fa-1.5rem text-primary-dark-2 w-1.5" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="server" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="" fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"></path></svg>${item}`,
        id:index+1,
        selected: item===serverStore.server_ip,
      }
    })
    const choices = new Choices(selectEl.value,{
      choices:selectData,
      allowHTML:true,
    });
  }
}

watch(
    ()=>fetchServerListsFlag.value,
    ()=>{
      initServerListSelect()
    }
)

onMounted(()=>{
  initServerListSelect()
})
</script>

<style >
@tailwind components;
@layer components {
  .choices__inner{
      @apply dark:!bg-primary-dark-3 text-[#333]
  }
  .choices__list.choices__list--dropdown{
    @apply dark:!bg-[rgb(70,79,91)] dark:!text-primary-light-1
  }
  .choices__input.choices__input--cloned{
    @apply dark:!bg-[rgb(70,79,91)]
  }
  .choices__list--dropdown .choices__item--selectable.is-highlighted, .choices__list[aria-expanded] .choices__item--selectable.is-highlighted{
    @apply dark:!bg-[#333]
  }

}
</style>