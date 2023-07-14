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
        <template v-for="item in settingDropdownOption">
          <li v-if="item.title==='Unlock user' ? status==='disable' :  item.title==='Lock user' ? status==='enable' : true"  @click="selectOperation(item.title)" class="hover:bg-gray-100">
            <font-awesome-icon class="text-0.9 mr-1" :icon="item.icon" :class="item.theme" />
            <p>{{item.title}}</p>
          </li>
        </template>

      </ul>
    </template>
  </VDropdown>

  <VModal :fade-outside="false" class="!p-0 !h-auto" v-model="operationData.modal">
    <div class="modal-body">
      <p  class="text-1 text-gray-800 dark:text-primary-dark-3 flex items-center gap-0.5"> Are you sure?</p>
      <p class="text-gray-800 text-0.8 mt-0.7 dark:text-primary-dark-3">
        Action on <span class="text-secondary-light-2 text-0.8">{{getServerIP}}</span> server <router-link class="text-secondary-light-2 !text-[0.65rem] hover:underline ml-0.1" to="/servers">switch</router-link>
      </p>
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
      <row v-if="operationData.renewUser" class="mt-0.5">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">expiration date:</p>
        </column>
        <column col="6">
          <FormKit id="newExpirationDateForm" type="form" ref="newExpirationDateForm"  @submit="renewUser"  :actions="false" >
            <FormKit
                name="new_exp"
                id="new_exp"
                validation-label="new expiration date"
                type="custom_date"
                :value="getEXdateDetail(exdate)"
                help="Enter a new expiration day."
                :validation="'required|date_after:'+exdate"
            />
          </FormKit>
        </column>
      </row>
      <row v-if="operationData.changeMulti" class="mt-0.5">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">new Multi:</p>
        </column>
        <column col="6">
          <FormKit id="newMultiForm" type="form" ref="newMultiForm"  @submit="changeMulti"  :actions="false" >
            <FormKit
                name="new_multi"
                id="new_multi"
                validation-label="new multi"
                type="custom_number"
                min="1"
                :value="multi"
                help="enter a new Multi number."
                validation="required|min:1"
            />
          </FormKit>
        </column>
      </row>
      <row v-if="operationData.askPassword" class="mt-0.5">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">new Password:</p>
        </column>
        <column col="6">
          <FormKit id="changePasswordForm" type="form" ref="changePasswordForm"  @submit="changePassword"  :actions="false" >
            <FormKit
                validation-label="password"
                :validation="[['required'], ['matches', /^.{3,20}$/]]"
                help="Between 3 and 20 characters."
                type="custom_password"
                id="new_change_password"
                name="new_change_password"
                suffix-icon="eyeClosed"
                @suffix-icon-click="handleIconClick"
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
import {getEXdateDetail} from "../../utils/Helper";
import VDropdown from '../global/VDropdown.vue'
import VTooltip from '../global/VTooltip.vue'
import {settingDropdownOption,handleIconClick} from "../../utils/Helper";
import {useServerStore} from "../../composables/useStates";
import {useSettings} from "../../composables/users/useSettings";
import VModal from '../global/VModal.vue'
const props=defineProps(['user','uid','exdate','status','multi']);
const {toggleDropdown,dropdownFlag,selectOperation,operationData,handlers,renewUser,newExpirationDateForm,changeMulti,newMultiForm,changePasswordForm,changePassword}=useSettings(props);
const {getServerIP}=useServerStore()


</script>


<style scoped>
@tailwind components;
@layer components {
  .setting-dropdown{
    @apply [&_li]:py-0.7 [&_li]:px-0.7  [&_li]:transition-all cursor-pointer [&_p]:font-400 [&_p]:text-0.8 [&_li]:flex [&_li]:items-center
  }
  .btn-operation{
    @apply  w-[2.8rem] h-[2.8rem] !flex !justify-center !items-center transition-all
  }
}
</style>