<template>
  <FormKit  id="changePasswordForm" type="form" ref="changePasswordForm"  @submit="changePasswordSubmit"  :actions="false" >
    <row class="px-1.5 pt-1">
      <column md="6" col="12">

        <FormKit
            type="custom_text"
            label="username"
            id="c_username"
            name="c_username"
            validation-label="username"
            :value="username"
            disabled=""
        />

      </column>
      <column md="6" col="12">
        <FormKit
            type="custom_password"
            label="password"
            id="new_password"
            name="new_password"
            validation-label="new password"
            help="Between 3 and 20 characters."
            suffix-icon="eyeClosed"
            @suffix-icon-click="handleIconClick"
            :validation="[['required'], ['matches', /^.{3,20}$/]]"
        />

      </column>
    </row>
  </FormKit>
  <div class="mt-1 modal-footer">
    <VBloader class="btn  btn-indigo btn-md"
              animation="slide-down"
              :duration="2000"
              @click="submitForm"
              :loading="fetchFlag"
    >
      Submit
    </VBloader>

    <button @click="emit('close')"  class="btn btn-secondary  btn-sm" >
      Close
    </button>
  </div>
</template>

<script setup lang="ts">
import {querySerialize,handleIconClick} from "../../utils/Helper";
import {ref} from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { reset } from '@formkit/core'
import VBloader from '../../components/global/VBloader.vue';
import {envVariable,useAuthStore} from "../../composables/useStates";
import {useLogout} from "../../composables/useLogout";
/////////////////////////////
const emit=defineEmits<{
  (e:'close'):void
}>();
const {apiBase}=envVariable()
const { notify }  = useNotification()
const {token,username}=useAuthStore()
const changePasswordForm=ref<any>(null);
const fetchFlag=ref(false)
const {logoutHandler}=useLogout()
const changePasswordSubmit = (formData) => {
  fetchFlag.value=true
  const query=querySerialize({mode:'admin',username:username.value,passwd:formData.new_password});

  fetch(apiBase+'change-passwd-user?'+query,{
    headers:{
      'Content-Type':'application/json',
      Authorization:`Bearer ${token.value}`
    },
  }).then(response=>response.json()).then((response)=>{
    if(response.detail){
      notify({
        type:'error',
        title:'Change Password',
        text:response.detail
      })
    }else{
      notify({
        type:'success',
        title:'Change Password',
        text:'password changed successfully! you need to login again.'
      })
      reset('changePasswordForm')
      logoutHandler()
    }
  }).catch(err=>{
    console.log(err)
    notify({
      type:'error',
      title:'Change Password',
      text:'operation failed due to network connection!'
    })
  }).finally(()=>{
    fetchFlag.value=false
    emit('close')
  })

}

const submitForm = () => {
  if(changePasswordForm.value){
    const node = (changePasswordForm.value as any).node
    node.submit()
  }
};

</script>

<style >
@tailwind components;
@layer components {
  #changePasswordForm .formkit-messages .formkit-message{
    @apply px-1.5
  }
}
</style>