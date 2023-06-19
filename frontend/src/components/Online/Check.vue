<template>
  <input type="checkbox" class="v-checkbox relative z-10" @change="checkboxHandler" :checked="selectedOnlineUserToKill?.includes(user)" :name="user" :id="user">
</template>

<script setup lang="ts">
import {useCheckBox} from "../../composables/online/useCheckBox";
import {useTableStore} from "../../composables/useStates";
const props=defineProps<{user:string}>()
const {checkboxHandler}=useCheckBox(props)
const {selectedOnlineUserToKill}=useTableStore()

</script>

<style scoped>

</style>