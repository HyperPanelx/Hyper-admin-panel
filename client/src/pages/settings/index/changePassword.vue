<template>
  <FormKit id="changePasswordForm" type="form" ref="changePasswordForm"  @submit="createAdminUserFormSubmit"  :actions="false" >
    <row>
      <column md="6" col="12">
        <FormKit
            disabled=""
            :value="username"
            type="text"
            id="c_username"
            name="c_username"
            input-class=" font-main"
            label="Username"
            label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
            :floating-label="true"
        />
      </column>
      <column md="6" col="12">
        <FormKit
            validation-label="password"
            validation="required"
            type="password"
            id="new_password"
            name="new_password"
            input-class=" font-main"
            label="New Password"
            label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
            :floating-label="true"
        />
      </column>
    </row>
  </FormKit>
  <div class="mt-1">
    <VBloader class="btn btn-indigo btn-md"
              animation="slide-down"
              :duration="2000"
              @click="submitForm"
              :loading="fetchFlag"
    >
      Submit
    </VBloader>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { reset } from '@formkit/core'
import VBloader from '../../../components/global/VBloader.vue';
import {envVariable,useAuthStore} from "../../../composables/useStates";
const {apiBase,apiKey}=envVariable()
const { notify }  = useNotification()
const {token,username}=useAuthStore()
const changePasswordForm=ref<any>(null);
const fetchFlag=ref(false)



const createAdminUserFormSubmit = (value) => {
  fetchFlag.value=true
  fetch(apiBase+'/panel/change-password',{
    method:'POST',
    headers:{
      Authorization:apiKey,
      'Content-type':'application/json',
      token:token.value
    },
    body:JSON.stringify({
      username:username.value,
      new_password:value.new_password
    })
  }).then(response=>response.json()).then(response=>{
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
        text:'password changed successfully'
      })
      reset('changePasswordForm')
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
  })

}

const submitForm = () => {
  if(changePasswordForm.value){
    const node = (changePasswordForm.value as any).node
    node.submit()
  }
};

</script>

<style scoped>

</style>