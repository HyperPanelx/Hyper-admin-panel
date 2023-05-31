<template>

  <td >
    <div class="p-1 ">
      <div class="mb-0.5 flex items-center gap-1">
        <Icon class="dark:!text-primary-dark-3 text-gray-700" name="ri:account-circle-fill" size="1.2rem"/>
        <p @click="copyText(user)" class="text-gray-800 dark:text-primary-light-1 ">
          {{user}}
        </p>
      </div>
      <div v-if="passwd" class="mb-0.5 flex items-center gap-1">
        <Icon class="dark:text-primary-dark-3 text-red-500" @click="showPasswordFlag=!showPasswordFlag" :name="showPasswordFlag ? 'mdi:eye':'mdi:eye-off'" size="1.2rem"/>
        <p @click="copyText(passwd)" :class="{'font-800':!showPasswordFlag}" class=" dark:text-primary-light-1 text-1  text-gray-800">{{showPasswordFlag ? passwd :  stringToPassword(passwd)}}</p>
      </div>
      <div v-if="telegram_id" class="flex items-center gap-1">
        <Icon class="dark:!text-primary-dark-3 text-blue-700" name="ri:telegram-fill" size="1.2rem"/>
        <p @click="copyText('@'+telegram_id)" class="text-gray-800 dark:text-primary-light-1 ">
          @{{telegram_id}}
        </p>
      </div>
    </div>
  </td>
  <td  >
    <div class=" p-1">
      <p v-if="traffic" class="dark:text-primary-dark-3 text-gray-800 mb-0.5 !text-0.8">{{traffic}}</p>
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
        <Icon size="0.8rem" name="bi:telephone-fill"  />
        {{phone}}
      </p>
      <p @click="copyText(email)" :title="email" class="text-gray-800 !text-[0.8rem] w-[6.5rem] text-hidden text-center dark:text-primary-dark-3 flex items-center  mx-auto gap-0.5" v-if="email">
        <Icon  size="0.8rem" name="bi:envelope-fill"/>
        {{email}}
      </p>
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
      <p :title="status" class="category-card " :class="{ 'bg-green-200 text-green-700':status==='enable','bg-red-200 text-red-700':status==='disable','bg-blue-200 text-blue-700':status==='Traffic completion'}">
        <Icon size="0.6rem" name="ri:checkbox-blank-circle-fill"/>
        {{status}}
      </p>
    </div>
  </td>
  <td >
    <div class="p-1 text-center flex gap-0.5 items-center">
      <VDropdown top-start="10px" top-end="0px" dropdown-class="w-11 left-[-11.5rem] top-[0]" v-model="dropdownFlag">
        <template #parent>
          <VTooltip content="Setting" inner-class="w-4 right-[-9px] bg-primary-dark-1/70">
            <button  @click="toggleDropdown" class="btn btn-sm btn-indigo !p-0.5 ">
              <Icon name="ri:settings-4-fill" size="1.5rem"  />
            </button>
          </VTooltip>
        </template>
        <template #content>
          <ul class="setting-dropdown">
            <li @click="selectOperation('Delete')" class="hover:bg-gray-100">
              <Icon name="ri:delete-bin-5-fill" class="text-red-500" />
              <p>Delete user</p>
            </li>
            <li @click="selectOperation('Change password')" class="hover:bg-gray-100">
              <Icon name="ri:file-transfer-fill" class="text-blue-500" />
              <p>Change password</p>
            </li>
            <li @click="selectOperation('Lock user')" class="hover:bg-gray-100">
              <Icon name="ri:lock-fill" class="text-red-500" />
              <p>Lock user</p>
            </li>
            <li @click="selectOperation('Unlock user')" class="hover:bg-gray-100">
              <Icon name="ri:lock-unlock-fill" class="text-green-500" />
              <p>Unlock user</p>
            </li>
          </ul>
        </template>
      </VDropdown>


      <VTooltip content="Edit" inner-class="w-3 right-[-5px] bg-primary-dark-1/70">
        <button @click="editUser(uid)" class="btn btn-sm btn-rose  !p-0.5">
          <Icon name="bi:pencil-square" size="1.5rem"  />
        </button>
      </VTooltip>
      <VTooltip content="Download user detail" inner-class="w-10 right-[-18px] bg-primary-dark-1/70">
        <button @click="downloadUserDetail" class="btn btn-sm btn-teal !p-0.5">
          <Icon name="fluent-mdl2:download-document" size="1.5rem"  />
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
    </div>
    <div class="modal-footer">
      <button @click="deleteUser" v-if="operationData.name==='Delete'" class="btn btn-secondary btn-sm" >
        Ok
      </button>
      <button @click="changePassword" v-else-if="operationData.name==='Change password'" class="btn btn-secondary btn-sm" >
        Ok
      </button>
      <button @click="lockUser" v-else-if="operationData.name==='Lock user'" class="btn btn-secondary btn-sm" >
        Ok
      </button>
      <button @click="unlockUser" v-else-if="operationData.name==='Unlock user'" class="btn btn-secondary btn-sm" >
        Ok
      </button>
      <button class="btn btn-indigo btn-sm" @click="operationData.modal=false">
        Close
      </button>
    </div>
  </VModal>

</template>

<script setup lang="ts">
import {stringToPassword,copyText} from "~/utils/Helper";
const props=defineProps(['user','traffic','usedVolume','multi','phone','email','registered','exdate','status','uid','passwd','telegram_id','desc','referral']);
const {editUser,downloadUserDetail,toggleDropdown,downloadAnchorElem,dropdownFlag,showPasswordFlag,selectOperation,operationData,deleteUser,unlockUser,lockUser,changePassword}=useUserOperation(props)



</script>

<style scoped>
@tailwind components;
@layer components {
  .setting-dropdown{
    @apply [&_li]:py-0.7 [&_li]:px-0.7  [&_li]:transition-all cursor-pointer [&_p]:font-400 [&_p]:text-0.8 [&_li]:flex [&_li]:items-center [&_li]:gap-1
  }
}
</style>