<template>
  <div class="p-1 flex justify-center ">
    <button class="btn btn-rose w-6 btn-sm relative z-10" @click="modalFlag=true">
      Kill user
    </button>
  </div>
  <VModal :fade-outside="false" class="!p-0 !h-auto" v-model="modalFlag">
    <div class="modal-body">
      <p class="text-1 text-gray-800 dark:text-primary-dark-3 flex items-center gap-0.5"> Are you sure?</p>
      <p class="text-gray-800 text-0.8 mt-0.7 dark:text-primary-dark-3">
        Action on <span class="text-secondary-light-2 text-0.8 ">{{getServerIP}}</span> server <router-link class="text-secondary-light-2 !text-[0.65rem] hover:underline ml-0.1" to="/servers">switch</router-link>
      </p>
      <row class="mt-1.5 justify-center">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">Operation: </p>
        </column>
        <column col="6">
          <p class="font-second dark:text-primary-light-1">Kill user</p>
        </column>
      </row>
      <row class="mt-0.5">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">username:</p>
        </column>
        <column col="6">
          <p class="font-second dark:text-primary-light-1">{{user}}</p>
        </column>
      </row>
    </div>
    <div class="modal-footer">
      <button  @click="killUser" class="btn btn-secondary btn-sm" >
        Ok
      </button>
      <button class="btn btn-indigo btn-sm" @click="modalFlag=false">
        Close
      </button>
    </div>
  </VModal>

</template>

<script setup lang="ts">
import VModal from '../global/VModal.vue'
import {useKill} from "../../composables/online/useKill";
import {useServerStore} from "../../composables/useStates";
const props=defineProps<{user:string,uid:number}>()
const {killUser,modalFlag}=useKill(props);
const {getServerIP}=useServerStore()
</script>

<style scoped>

</style>