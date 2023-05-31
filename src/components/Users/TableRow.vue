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
      <div v-if="telegram_id" class="mb-0.5 flex items-center gap-1">
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
      <p class="text-gray-800 flex items-center  !text-[0.8rem] mb-0.5 text-center dark:text-primary-dark-3 gap-0.5 " v-if="phone">
        <Icon size="0.8rem" name="bi:telephone-fill"  />
        {{phone}}
      </p>
      <p :title="email" class="text-gray-800 !text-[0.8rem] w-[6.5rem] text-hidden text-center dark:text-primary-dark-3 flex items-center  mx-auto gap-0.5" v-if="email">
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
    <div class="p-1 text-center">
      <button @click="editUser(uid)" class="btn btn-sm btn-indigo !p-0.5 mr-0.5">
        <Icon name="ri:settings-4-fill" size="1.5rem"  />
      </button>
      <button @click="userSetting(uid)" class="btn btn-sm btn-rose mr-0.5 !p-0.5">
        <Icon name="bi:pencil-square" size="1.5rem"  />
      </button>
      <button @click="downloadUserDetail" class="btn btn-sm btn-teal !p-0.5">
        <Icon name="fluent-mdl2:copy" size="1.5rem"  />
        <a ref="downloadAnchorElem" style="display:none"></a>
      </button>
    </div>
  </td>
</template>

<script setup lang="ts">
import {stringToPassword,copyText} from "~/utils/Helper";
const props=defineProps(['user','traffic','usedVolume','multi','phone','email','registered','exdate','status','uid','passwd','telegram_id','desc','referral'])
const showPasswordFlag=ref<boolean>(false)
const {editUser,downloadUserDetail,userSetting,downloadAnchorElem}=useUserOperation(props)



</script>

<style scoped>

</style>