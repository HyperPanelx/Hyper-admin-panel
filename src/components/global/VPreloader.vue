<template>
  <section v-if="on" class="page-preloader">
    <half-circle-spinner
        :animation-duration="1300"
        :size="130"
        color="#727cf5"
    />
  </section>
</template>

<script setup lang="ts">
import { HalfCircleSpinner } from 'epic-spinners'
const props=defineProps<{
  on:boolean
}>()


</script>

<style scoped>

</style>