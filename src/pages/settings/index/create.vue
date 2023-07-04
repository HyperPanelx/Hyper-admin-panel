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
              input-class=" font-main dark:text-primary-light-1"
              label="Username"
              label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
              :floating-label="true"
          />
        </column>
        <column md="6" col="12">
          <FormKit
              validation-label="password"
              :validation="[['required'], ['matches', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/]]"
              help="Minimum eight characters, at least one letter, one number and one special character"
              type="password"
              help-class="dark:text-primary-light-1"
              id="admin_password"
              name="admin_password"
              input-class=" font-main dark:text-primary-light-1"
              label="Password"
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
const {apiBase}=envVariable()
const { notify }  = useNotification()
const {token}=useAuthStore()
const createAdminUserForm=ref<any>(null);
const fetchFlag=ref(false)



const createAdminUserFormSubmit = (formData) => {
  fetchFlag.value=true
  const query=querySerialize({username:formData.admin_username,passwd:formData.admin_password});
  fetch(apiBase+'panel/create/?'+query,{
    headers:{
      'Content-Type':'application/json',
      Authorization:`Bearer ${token.value}`
    },
  }).
  then(response=>response.json()).
  then((response)=>{
    if(response.detail){
      notify({
        type:'error',
        title:'Create Admin User',
        text:response.detail
      })
    }else{
      notify({
        type:'success',
        title:'Create Admin User',
        text:'user created successfully'
      })
      reset('createAdminUserForm')
    }
  }).catch(err=>{
    console.log(err)
    notify({
      type:'error',
      title:'Create Admin User',
      text:'operation failed due to network connection!'
    })
  }).finally(()=>{
    fetchFlag.value=false
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