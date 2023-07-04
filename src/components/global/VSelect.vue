<template>
  <select @change="emit('fire',$event.target.value)" ref="selectEl" :name="id" :id="id"></select>
</template>

<script setup lang="ts">
import Choices from "choices.js";
import {onMounted, ref, watch} from "vue";
const selectEl=ref(null);
const props=defineProps<{
  list:string[]|number[],
  id:string,
  search:boolean,
  reset:boolean
  init?:string,
  placeholder:boolean
}>()
const emit=defineEmits<{
(e:'fire',value:any):void
}>();
//////////////////////////////////
let choices;
onMounted(()=>{
  if(selectEl.value) {
    const initItem=(props.init && props.placeholder) ? [{
      value:props.init,
      label:props.init,
      id:0,
      selected:true,
      disabled:true
    }] : [];
    const selectData=[...props.list].reduce((p1,p2)=>{
      return [
        {
          value:p2,
          label:p2,
          selected:false
        },
        ...p1,
      ]
    },initItem);
     choices = new Choices(selectEl.value,{
      choices:selectData,
      allowHTML:true,
      searchEnabled:props.search,
      searchChoices:props.search,
      position:'bottom',
       classNames:{
         containerOuter:'!w-full m-0 choices',
         containerInner: 'choices__inner',
         input: 'choices__input',
         inputCloned: 'choices__input--cloned',
         list: 'choices__list',
         listItems: 'choices__list--multiple',
         listSingle: 'choices__list--single',
         listDropdown: 'choices__list--dropdown',
         item: 'choices__item',
         itemSelectable: 'choices__item--selectable',
         itemDisabled: 'choices__item--disabled',
         itemChoice: 'choices__item--choice',
         placeholder: 'choices__placeholder',
         group: 'choices__group',
         groupHeading: 'choices__heading',
         button: 'choices__button',
         activeState: 'is-active',
         focusState: 'is-focused',
         openState: 'is-open',
         disabledState: 'is-disabled',
         highlightedState: 'is-highlighted',
         selectedState: 'is-selected',
         flippedState: 'is-flipped',
         loadingState: 'is-loading',
         noResults: 'has-no-results',
         noChoices: 'has-no-choices'
       }
    });


  }

})

watch(
    ()=>props.reset,
    ()=>{
      choices.setChoiceByValue(props.init)
    }
)
</script>

<style scoped>
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
  .choices__list.choices__list--dropdown{
    @apply absolute z-[999]
  }
  .choices__list--dropdown .choices__item--selectable, .choices__list[aria-expanded] .choices__item--selectable{
    @apply pr-0 after:!hidden
  }
}
</style>