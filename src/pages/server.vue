<template>
  <FormKit
      v-if="fetchServerListsFlag"
      type="select"
      v-model="serverStore.server_ip"
      name="sort"
      placeholder="sort by"
      input-class="select-dark"
      :options="getHostList"
  />
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useServerStore} from "../composables/useStates";
const {serverStore,getHostList,fetchServerListsFlag}=useServerStore()
onMounted(()=>{
  serverStore.fetchServersList()
})




</script>

<style scoped>

</style>