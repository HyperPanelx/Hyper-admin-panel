<template>
  <VDropdown top-start="10px" class="mr-0.5 relative z-[100]" top-end="0px" dropdown-class="!w-11 !left-[-11.5rem] !top-[0]" v-model="dropdownFlag">
    <template #parent>
      <VTooltip content="Setting" inner-class="!w-4 !right-[-11px] !bg-primary-dark-1/70">
        <button  @click="toggleDropdown" class=" btn-indigo btn-operation">
          <font-awesome-icon class="text-1.3 text-primary-light-1" icon="fa-solid fa-gear" />
        </button>
      </VTooltip>
    </template>
    <template #content>
      <ul class="setting-dropdown">
        <li v-for="item in settingDropdownOption" @click="selectOperation(item.title)" class="hover:bg-gray-100">
          <font-awesome-icon class="text-0.9 mr-1" :icon="item.icon" :class="item.theme" />
          <p>{{item.title}}</p>
        </li>
      </ul>
    </template>
  </VDropdown>

  <VModal :fade-outside="false" class="!p-0 !h-auto" v-model="operationData.modal">
    <div class="modal-body">
      <p v-if="operationData.changePassword" class="text-1 text-gray-800 dark:text-primary-dark-3 flex items-center gap-0.5">Password changed.</p>
      <p v-else class="text-1 text-gray-800 dark:text-primary-dark-3 flex items-center gap-0.5"> Are you sure?</p>
      <row class="mt-1.5 justify-center">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">Operation: </p>
        </column>
        <column col="6">
          <p class="font-second dark:text-primary-light-1">{{operationData.name}}</p>
        </column>
      </row>
      <row class="mt-0.5">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">username:</p>
        </column>
        <column col="6">
          <p class="font-second dark:text-primary-light-1">{{operationData.username}}</p>
        </column>
      </row>
      <row v-if="operationData.changePassword" class="mt-0.5">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">new password:</p>
        </column>
        <column col="6">
          <p @click="copyText(operationData.newPassword)" class="font-second dark:text-primary-light-1">{{operationData.newPassword}}</p>
        </column>
      </row>
      <row v-if="operationData.renewUser" class="mt-0.5">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">expiration date:</p>
        </column>
        <column col="6">
          <FormKit id="newExpirationDateForm" type="form" ref="newExpirationDateForm"  @submit="renewUser"  :actions="false" >
            <FormKit
                name="new_exp"
                id="new_exp"
                validation-label="New expiration date"
                type="date"
                :value="exdate"
                help-class="dark:text-primary-light-1"
                help="Enter a new expiration day."
                :validation="'required|date_after:'+exdate"
            />
          </FormKit>
        </column>
      </row>

    </div>
    <div class="modal-footer">
      <template v-for="item in settingDropdownOption">
        <button v-on="handlers(item.title)" v-if="operationData.name===item.title" class="btn btn-secondary btn-sm" >
          Ok
        </button>
      </template>
      <button class="btn btn-indigo btn-sm" @click="operationData.modal=false">
        Close
      </button>
    </div>
  </VModal>

</template>

<script setup lang="ts">
import VDropdown from '../global/VDropdown.vue'
import VTooltip from '../global/VTooltip.vue'
import {copyText} from "../../utils/Helper";
import {settingDropdownOption} from "../../utils/Data";
import {useSettings} from "../../composables/users/useSettings";
import VModal from '../global/VModal.vue'
const props=defineProps(['user','uid','exdate']);
const {toggleDropdown,dropdownFlag,selectOperation,operationData,handlers,renewUser,newExpirationDateForm}=useSettings(props);


</script>


<style scoped>
@tailwind components;
@layer components {
  .setting-dropdown{
    @apply [&_li]:py-0.7 [&_li]:px-0.7  [&_li]:transition-all cursor-pointer [&_p]:font-400 [&_p]:text-0.8 [&_li]:flex [&_li]:items-center
  }
  .formkit-input{
    @apply  !font-second
  }
  .btn-operation{
    @apply  w-[2.8rem] h-[2.8rem] !flex !justify-center !items-center transition-all
  }
}
</style>