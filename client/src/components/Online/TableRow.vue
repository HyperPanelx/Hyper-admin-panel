<template>
  <td>
    <div class="pl-0.5">
      <input type="checkbox" class="v-checkbox" @change="checkboxHandler" :checked="selectedOnlineUserToKill?.includes(user)" :name="user" :id="user">
    </div>
  </td>
  <td>
    <div class="p-1">
      <p class="text-center dark:text-primary-dark-3">
        {{index+1}}
      </p>
    </div>
  </td>
  <td>
    <div class="p-1 flex justify-center items-center gap-0.5">
      <Icon class="dark:!text-primary-dark-3 text-gray-700" name="ri:account-circle-fill" size="1.2rem"/>
      <p class=" dark:text-primary-light-1">{{user}}</p>
    </div>
  </td>
  <td>
    <div class="p-1">
      <p v-if="ip" class="text-center dark:text-primary-light-1">{{ip}}</p>
      <p v-else class="text-0.7 dark:text-primary-dark-3 text-gray-700 text-center">No Data.</p>
    </div>
  </td>
  <td>
    <div class="p-1 flex justify-center">
      <button class="btn btn-rose btn-sm" @click="modalFlag=true">
        Kill user
      </button>
    </div>
  </td>
  <VModal :fade-outside="false" class="!p-0 !h-auto" v-model="modalFlag">
    <div class="modal-body">
      <p class="text-1 text-gray-800 dark:text-primary-dark-3 flex items-center gap-0.5"> Are you sure?</p>
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
const props=defineProps<{
  user:string,
  ip:string,
  index:number,
  uid:number
}>();
const {checkboxHandler,killUser,modalFlag}=useOnlineUserOperation(props);
const {selectedOnlineUserToKill}=useStates()

</script>

<style scoped>

</style>