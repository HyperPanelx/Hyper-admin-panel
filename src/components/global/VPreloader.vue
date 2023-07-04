<template>
  <template v-if="freeze">
    <teleport to="body">
      <section v-if="freeze" class="page-preloader flex flex-col !h-full !z-[9999] !opacity-90 !fixed">
        <half-circle-spinner
            :animation-duration="1300"
            :size="130"
            color="#727cf5"
        />
        <p class="text-center mt-2 text-gray-700 dark:text-primary-dark-3">Switching to {{getServerIP}} server. please wait...</p>
      </section>
    </teleport>
  </template>
  <template v-else>
    <section v-if="on" class="page-preloader">
      <half-circle-spinner
          :animation-duration="1300"
          :size="130"
          color="#727cf5"
      />
    </section>
  </template>

</template>

<script setup lang="ts">
import {useServerStore} from "../../composables/useStates";
import { HalfCircleSpinner } from 'epic-spinners'
const {getServerIP}=useServerStore()
const props=defineProps({
  on:{
    required:true,
    type:Boolean
  },
  freeze:{
    required:false,
    type:Boolean,
    default:false
  }
})


</script>

<style scoped>

</style>