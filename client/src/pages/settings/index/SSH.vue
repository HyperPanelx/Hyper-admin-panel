<template>
  <FormKit id="changeSSHForm" type="form" ref="changeSSHForm"  @submit="createAdminUserFormSubmit"  :actions="false" >
    <row>
      <column  col="12">
        <FormKit
            validation="min:1"
            type="number"
            validation-label="Port"
            value="1"
            min="1"
            id="new_ssh"
            name="new_ssh"
            input-class=" font-main"
            label="New SSH Port"
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
const {token}=useAuthStore()
const changeSSHForm=ref<any>(null);
const fetchFlag=ref(false)



const createAdminUserFormSubmit = (value) => {
  fetchFlag.value=true
  fetch(apiBase+'/panel/change-ssh',{
    method:'POST',
    headers:{
      Authorization:apiKey,
      'Content-type':'application/json',
      token:token.value
    },
    body:JSON.stringify(value)
  }).then(response=>response.json()).then(response=>{
    if(response.detail){
      notify({
        type:'error',
        title:'Change SSH Port',
        text:response.detail
      })
    }else{
      notify({
        type:'success',
        title:'Change SSH Port',
        text:'SSH port changed successfully! please reset server.'
      })
      reset('changeSSHForm')
    }
  }).catch(err=>{
    console.log(err)
    notify({
      type:'error',
      title:'Change SSH Port',
      text:'operation failed due to network connection!'
    })
  }).finally(()=>{
    fetchFlag.value=false
  })

}

const submitForm = () => {
  if(changeSSHForm.value){
    const node = (changeSSHForm.value as any).node
    node.submit()
  }
};

</script>

<style scoped>

</style>