<template>
  <input type="checkbox" class="v-checkbox relative z-10" @change="checkboxHandler" :checked="selectedUserToDelete?.includes(user)" :name="user" :id="user">
</template>

<script setup lang="ts">
import {useCheckBox} from "../../composables/users/useCheckBox";
import {useTableStore} from "../../composables/useStates";
const props=defineProps<{
  user:string
}>();
const {checkboxHandler}=useCheckBox(props)
const {selectedUserToDelete}=useTableStore();

</script>

<style scoped>

</style>