<template>
  <FormKit id="changePasswordForm" type="form" ref="changePasswordForm"  @submit="changePasswordSubmit"  :actions="false" >
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
            :validation="[['required'], ['matches', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/]]"
            type="password"
            id="new_password"
            name="new_password"
            input-class=" font-main"
            help="Minimum eight characters, at least one letter, one number and one special character"
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
import {querySerialize} from "../../../utils/Helper";
import {ref} from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { reset } from '@formkit/core'
import VBloader from '../../../components/global/VBloader.vue';
import {envVariable,useAuthStore} from "../../../composables/useStates";
import {useLogout} from "../../../composables/useLogout";
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