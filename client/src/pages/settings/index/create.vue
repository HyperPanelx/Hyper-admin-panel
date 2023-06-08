<template>
  <FormKit id="createAdminUserForm" type="form" ref="createAdminUserForm"  @submit="createAdminUserFormSubmit"  :actions="false" >
      <row>
        <column md="6" col="12">
          <FormKit
              validation-label="username"
              validation="required"
              type="text"
              id="admin_username"
              name="admin_username"
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
              id="admin_password"
              name="admin_password"
              input-class=" font-main"
              label="Password"
              label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
              :floating-label="true"
          />
        </column>
      </row>
  </FormKit>
  <div class="mt-1 flex gap-2 items-center">
    <VBloader class="btn btn-indigo btn-md"
              animation="slide-down"
              :duration="2000"
              @click="submitForm"
              :loading="createUserData.on"
    >
      Submit
    </VBloader>
    <p class="text-gray-800 dark:text-primary-light-1">
      {{createUserData.msg}}
    </p>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive} from "vue";
import { reset } from '@formkit/core'
import VBloader from '../../../components/global/VBloader.vue';
import {envVariable,useAuthStore} from "../../../composables/useStates";
const {apiBase,apiKey}=envVariable()
const {token}=useAuthStore()
const createAdminUserForm=ref<any>(null);
const createUserData=reactive({
  on:false,
  msg:''
});

const createAdminUserFormSubmit = (value) => {
  createUserData.on=true
  createUserData.msg=''
  fetch(apiBase+'/panel/admin',{
    method:'POST',
    headers:{
      Authorization:apiKey,
      'Content-type':'application/json',
      token:token.value
    },
    body:JSON.stringify(value)
  }).then(response=>response.json()).then(response=>{
    if(response.detail){
      createUserData.msg=response.detail
    }else{
      createUserData.msg='User created successfully!'
      reset('createAdminUserForm')
    }
  }).catch(err=>{
    console.log(err)
    createUserData.msg='Error in connecting to api!'
  }).finally(()=>{
    createUserData.on=false
  })

}

const submitForm = () => {
  if(createAdminUserForm.value){
    const node = (createAdminUserForm.value as any).node
    node.submit()
  }
};

</script>

<style scoped>

</style>