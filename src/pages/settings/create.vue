<template>
  <FormKit id="createAdminUserForm" type="form" ref="createAdminUserForm"  @submit="createAdminUserFormSubmit"  :actions="false" >
      <row class="px-1.5 pt-1">
        <column md="6" col="12">
          <FormKit
              type="custom_text"
              label="username"
              id="admin_username"
              name="admin_username"
              validation-label="username"
              validation="required"
          />
        </column>
        <column md="6" col="12">
          <FormKit
              type="custom_password"
              label="password"
              id="admin_password"
              name="admin_password"
              validation-label="password"
              help="Between 3 and 20 characters."
              suffix-icon="eyeClosed"
              @suffix-icon-click="handleIconClick"
              :validation="[['required'], ['matches', /^.{3,20}$/]]"
          />
        </column>
      </row>
  </FormKit>
  <div class="mt-1 modal-footer">
    <VBloader class="btn btn-indigo  btn-md"
              animation="slide-down"
              :duration="2000"
              @click="submitForm"
              :loading="fetchFlag"
    >
      Submit
    </VBloader>
    <button @click="emit('close')" class="btn btn-secondary btn-sm" >
      Close
    </button>
  </div>
</template>

<script setup lang="ts">
import {querySerialize,handleIconClick} from "../../utils/Helper";
import {IResponse} from "../../utils/Types";
import {ref} from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { reset } from '@formkit/core'
import VBloader from '../../components/global/VBloader.vue';
import {envVariable,useAuthStore} from "../../composables/useStates";
/////////////
const {apiBase}=envVariable()
const { notify }  = useNotification()
const {token}=useAuthStore()
const createAdminUserForm=ref<any>(null);
const fetchFlag=ref(false)
const emit=defineEmits<{
  (e:'close'):void
}>();


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
  then((response:IResponse<any>)=>{
    if(response.success){
      notify({
        type:'success',
        title:'Create Admin User',
        text:'user created successfully'
      })
      reset('createAdminUserForm')
    }else{
      notify({
        type:'error',
        title:'Create Admin User',
        text:response.message
      })

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
    emit('close')
  })

}

const submitForm = () => {
  if(createAdminUserForm.value){
    const node = (createAdminUserForm.value as any).node
    node.submit()
  }
};

</script>

<style >
@tailwind components;
@layer components {
  #createAdminUserForm .formkit-messages .formkit-message{
    @apply px-1.5
  }
}
</style>