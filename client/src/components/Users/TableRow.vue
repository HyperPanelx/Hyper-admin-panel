<template>
  <td>
    <div class="pl-0.5">
      <input type="checkbox" class="v-checkbox" @change="checkboxHandler" :checked="selectedUserToDelete?.includes(user)" :name="user" :id="user">
    </div>
  </td>
  <td >
    <div class="p-1 ">
      <div class="mb-0.5 flex items-center gap-1">
        <font-awesome-icon class="dark:!text-primary-dark-3 text-gray-700 text-0.8" icon="fa-solid fa-user"/>
        <p @click="copyText(user)" class="text-gray-800 dark:text-primary-light-1 ">
          {{user}}
        </p>
      </div>
      <div v-if="passwd" class="mb-0.5 flex items-center gap-1">
        <font-awesome-icon class="dark:text-red-300 text-0.8 text-red-500" @click="showPasswordFlag=!showPasswordFlag" :icon="showPasswordFlag ? 'fa-solid fa-eye-slash':'fa-solid fa-eye'" size="1.2rem"/>
        <p @click="copyText(passwd)" :class="{'font-800':!showPasswordFlag,'!text-0.9':showPasswordFlag}" class=" dark:text-primary-light-1 text-1  text-gray-800">{{showPasswordFlag ? passwd :  stringToPassword(passwd)}}</p>
      </div>
      <div v-if="telegram_id" class="flex items-center gap-1">
        <font-awesome-icon class="dark:!text-blue-300 text-blue-700 text-0.8" icon="fa-brands fa-telegram"/>
        <p @click="copyText('@'+telegram_id)" :title="telegram_id" class="text-gray-800 text-hidden w-[7.6rem] dark:text-primary-light-1 ">
          @{{telegram_id}}
        </p>
      </div>
    </div>
  </td>
  <td  >
    <div class=" p-1">
      <p v-if="traffic" class="dark:text-primary-dark-3 text-center text-gray-800 mb-0.5 !text-0.8">{{traffic}}</p>
      <p v-else class="text-0.7 dark:text-primary-dark-3 text-gray-700 text-center">No Data.</p>
      <p v-if="usedVolume" class="dark:text-primary-dark-3 text-gray-800 !text-0.8">Used Volume: {{usedVolume}}</p>
    </div>
  </td>
  <td >
    <div >
      <p v-if="multi" class="text-gray-800 dark:text-primary-dark-3 text-center">
        {{multi}}
      </p>
    </div>
  </td>
  <td >
    <div class="p-0.5">
      <p @click="copyText(phone)" class="text-gray-800 flex items-center  !text-[0.8rem] mb-0.5 text-center dark:text-primary-dark-3 gap-0.5 " v-if="phone">
        <font-awesome-icon class="text-0.8" size="0.8rem" icon="fa-solid fa-phone"  />
        {{phone}}
      </p>
      <div @click="copyText(email)" :title="email" class=" flex items-center dark:text-primary-dark-3  gap-0.5 text-gray-800" v-if="email">
        <font-awesome-icon  size="0.8rem" class="text-0.8" icon="fa-regular fa-envelope"/>
        <p class="text-gray-800 !text-[0.8rem] w-5.5 text-hidden text-center dark:text-primary-dark-3">
          {{email}}
        </p>
      </div>
      <p v-if="!email && !phone" class="text-0.7 dark:text-primary-dark-3 text-gray-700 text-center">No Data.</p>
    </div>
  </td>
  <td >
    <div class="p-1">
      <p class="text-gray-800 dark:text-primary-dark-3 text-0.8 mb-0.5">Registered: <template v-if="registered">{{registered}}</template></p>
      <p class="text-gray-800 dark:text-primary-dark-3 text-0.8 ">Expired: <template v-if="exdate"> {{exdate}}</template></p>
    </div>
  </td>
  <td >
    <div class="p-1">
      <p :title="status" class="category-card text-hidden" :class="{ 'bg-green-200 text-green-700':status==='enable','bg-red-200 text-red-700':status==='disable','bg-blue-200 text-blue-700':status==='Traffic completion'}">
        <span :class="{ 'bg-green-700':status==='enable','bg-red-700':status==='disable','bg-blue-700':status==='Traffic completion'}" class="inline-block w-0.5 rounded-full h-0.5 "></span>
        {{status}}
      </p>
    </div>
  </td>
  <td >
    <div class="p-1 text-center flex gap-0.5 items-center">
      <VDropdown top-start="10px" top-end="0px" dropdown-class="!w-11 !left-[-11.5rem] !top-[0]" v-model="dropdownFlag">
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
              <font-awesome-icon class="text-0.9" :icon="item.icon" :class="item.theme" />
              <p>{{item.title}}</p>
            </li>
          </ul>
        </template>
      </VDropdown>

      <VTooltip content="Edit" inner-class="!w-3 !right-[-2px] !bg-primary-dark-1/70">
        <button @click="editUser(uid)" class=" btn-rose btn-operation">
          <font-awesome-icon class="text-1.3 text-primary-light-1" icon="fa-regular fa-pen-to-square" />
        </button>
      </VTooltip>
      <VTooltip content="Download user detail" inner-class="!w-10 !right-[-18px] !bg-primary-dark-1/70">
        <button @click="downloadUserDetail" class="btn-operation btn-teal ">
          <font-awesome-icon class="text-1.3 text-primary-light-1" icon="fa-solid fa-download" />
          <a ref="downloadAnchorElem" style="display:none"></a>
        </button>
      </VTooltip>
    </div>
  </td>
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
import {stringToPassword,copyText} from "../../utils/Helper";
import {settingDropdownOption} from "../../utils/Data";
import VDropdown from '../../components/global/VDropdown.vue'
import VModal from '../../components/global/VModal.vue'
import {useTableStore} from "../../composables/useStates";
import VTooltip from '../../components/global/VTooltip.vue'
import {useUserOperation} from "../../composables/users/useOperation";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const props=defineProps(['user','traffic','usedVolume','multi','phone','email','registered','exdate','status','uid','passwd','telegram_id','desc','referral']);
const {editUser,downloadUserDetail,toggleDropdown,downloadAnchorElem,dropdownFlag,showPasswordFlag,selectOperation,operationData,handlers,renewUser,newExpirationDateForm,checkboxHandler}=useUserOperation(props);
const {selectedUserToDelete}=useTableStore();





</script>

<style scoped>
@tailwind components;
@layer components {
  .setting-dropdown{
    @apply [&_li]:py-0.7 [&_li]:px-0.7  [&_li]:transition-all cursor-pointer [&_p]:font-400 [&_p]:text-0.8 [&_li]:flex [&_li]:items-center [&_li]:gap-1
  }
  .formkit-input{
    @apply  !font-second
  }
  .btn-operation{
    @apply  w-[2.8rem] h-[2.8rem] !flex !justify-center !items-center transition-all
  }
}
</style>