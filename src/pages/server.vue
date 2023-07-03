<template>
  <button @click="goBack">
    back
  </button>

  <FormKit
      v-if="fetchServerListsFlag"
      type="select"
      v-model="newServerIP"
      @change="serverStore.changeServerIP(newServerIP)"
      name="sort"
      placeholder="sort by"
      input-class="select-dark"
      :options="getHostList"
  />
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useServerStore} from "../composables/useStates";
const {serverStore,getHostList,fetchServerListsFlag}=useServerStore()
const newServerIP=ref(serverStore.server_ip);


const goBack = () => {
  history.back()
}
</script>

<style scoped>

</style>