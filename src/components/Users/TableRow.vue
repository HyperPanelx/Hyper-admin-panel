<template>
  <td>
    <div class="pl-0.5">
      <CheckBox :user="user"/>
    </div>
  </td>
  <td >
    <div class="p-1 ">
      <div class="mb-0.5 flex items-center">
        <font-awesome-icon class="dark:!text-primary-dark-3 text-gray-700 text-0.8 mr-1" icon="fa-solid fa-user"/>
        <p @click="copyText(user)" :title="user" class="text-gray-800 w-[7.6rem]  text-hidden dark:text-primary-light-1 relative z-10">
          {{user}}
        </p>
      </div>
      <div v-if="passwd" class="mb-0.5 flex items-center ">
        <font-awesome-icon  class="dark:text-red-300 relative z-10 text-0.8 mr-1 text-red-500" @click="showPasswordFlag=!showPasswordFlag" :icon="showPasswordFlag ? 'fa-solid fa-eye-slash':'fa-solid fa-eye'" size="1.2rem"/>
        <p @click="copyText(passwd)" :class="{'font-800':!showPasswordFlag,'!text-0.9':showPasswordFlag}" class=" dark:text-primary-light-1 text-1 w-[7.6rem]  text-hidden relative z-10 text-gray-800 ">{{showPasswordFlag ? passwd :  stringToPassword(passwd)}}</p>
      </div>
      <div v-if="telegram_id" class="flex items-center ">
        <font-awesome-icon class="dark:!text-blue-300 mr-1 text-blue-700 text-0.8" icon="fa-brands fa-telegram"/>
        <p @click="copyText('@'+telegram_id)" :title="telegram_id" class="text-gray-800 text-hidden w-[7.6rem] dark:text-primary-light-1  relative z-10">
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
  <td class="w-[8%]">
    <div >
      <p v-if="multi" class="text-gray-800 dark:text-primary-dark-3 text-center">
        {{multi}}
      </p>
    </div>
  </td>
  <td >
    <div class="p-0.5">
      <p @click="copyText(phone)" class="text-gray-800 flex items-center  !text-[0.8rem] mb-0.5 text-center dark:text-primary-dark-3  relative z-10" v-if="phone">
        <font-awesome-icon class="text-0.8 mr-0.5" size="0.8rem" icon="fa-solid fa-phone"  />
        {{phone}}
      </p>
      <div @click="copyText(email)" :title="email" class=" flex items-center dark:text-primary-dark-3  text-gray-800" v-if="email">
        <font-awesome-icon  size="0.8rem" class="text-0.8 mr-0.5" icon="fa-regular fa-envelope"/>
        <p class="text-gray-800 relative z-10 !text-[0.8rem] w-5.5 text-hidden text-center dark:text-primary-dark-3">
          {{email}}
        </p>
      </div>
      <p v-if="!email && !phone" class="text-0.7 dark:text-primary-dark-3 text-gray-700 text-center">No Data.</p>
    </div>
  </td>
  <td >
    <div class="p-1">
      <p class="text-secondary-light-2 dark:text-primary-dark-3 text-0.7 mb-0.5 ">Registered at: <template v-if="registered"><span class="text-gray-700 text-0.7 dark:text-primary-light-1">{{registered}}</span></template></p>
      <p class="text-secondary-light-2 dark:text-primary-dark-3 text-0.7  ">Expired at: <template v-if="exdate"> <span class="text-gray-700 text-0.7 dark:text-primary-light-1">{{exdate}}</span></template></p>
      <p  class="text-secondary-light-2  text-0.7 dark:text-primary-dark-3 mt-0.5 ">
        Created by: <span class="text-gray-700 text-0.7 dark:text-primary-light-1">{{ordered_by}}</span>
      </p>
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
  <td class="py-1">
    <div class="p-1 text-center flex items-center">
      <Settings :status="status" :user="user" :uid="uid" :exdate="exdate"/>
      <Edit :uid="uid" :user="user" />
      <Download v-bind="props" />
    </div>
  </td>
  <td class="absolute top-0 left-0 w-full h-full z-[5]" @click="checkboxHandler" colspan="0">
    <span v-if="isUserExpired(user)" class="top-0 w-full absolute inline-block left-0 text-center  text-primary-light-1 text-0.7 " :class="{'bg-red-500':getUserExpiredDetail(user).status==='danger','bg-amber-500':getUserExpiredDetail(user).status==='warning'}">
      {{getUserExpiredDetail(user)?.msg ?? ''}}
    </span>

    <div class="w-full absolute bottom-0 left-0 pr-1 pb-0.2 flex justify-end">
      <p :title="`created at ${server} server`" class="text-gray-600 text-0.7 w-[9.5rem] text-hidden dark:text-primary-dark-3 ">
        created at {{server}} server
      </p>
    </div>
  </td>
</template>

<script setup lang="ts">
import {stringToPassword, copyText} from "../../utils/Helper";
import Settings from './Setting.vue'
import Edit from './Edit.vue'
import Download from './Download.vue'
import CheckBox from './Check.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref} from "vue";
import {useCheckBox} from "../../composables/users/useCheckBox";
import {useDashboardStore} from "../../composables/useStates";
/////////////////////////////////////////////////////////////
const props=defineProps(['user','traffic','usedVolume','multi','phone','email','registered','exdate','status','uid','passwd','telegram_id','desc','referral','server','ordered_by']);
const showPasswordFlag=ref<boolean>(false)
const {checkboxHandler}=useCheckBox(props);
const {dashboardStore,isUserExpired,getUserExpiredDetail}=useDashboardStore();
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