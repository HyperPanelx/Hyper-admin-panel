<template>
  <FormKit id="changeSSHForm" type="form" ref="changeSSHForm"  @submit="changeSSHPortFormSubmit"  :actions="false" >
    <row>
      <column  col="12">
        <FormKit
            validation="min:1"
            type="custom_number"
            validation-label="port"
            value="1"
            min="1"
            id="new_ssh"
            name="new_ssh"
            label="New SSH Port"
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
const {apiBase}=envVariable()
const { notify }  = useNotification()
const {token}=useAuthStore()
const changeSSHForm=ref<any>(null);
const fetchFlag=ref(false)



const changeSSHPortFormSubmit = (formData) => {
  fetchFlag.value=true
  const newPort=formData.new_ssh
  ///
  notify({
          type:'success',
          title:'Change SSH Port',
          text:'SSH port changed successfully! please reset server.'
  })
  reset('changeSSHForm')
  fetchFlag.value=false

  ////
  // fetch(apiBase+'/panel/change-ssh',{
  //   headers:{
  //     'Content-Type':'application/json',
  //     Authorization:`Bearer ${token.value}`
  //   },
  // }).then(response=>response.json()).then((response)=>{
  //   if(response.error){
  //     notify({
  //       type:'error',
  //       title:'Change SSH Port',
  //       text:response.msg
  //     })
  //   }else{
  //     notify({
  //       type:'success',
  //       title:'Change SSH Port',
  //       text:'SSH port changed successfully! please reset server.'
  //     })
  //     reset('changeSSHForm')
  //   }
  // }).catch(err=>{
  //   console.log(err)
  //   notify({
  //     type:'error',
  //     title:'Change SSH Port',
  //     text:'operation failed due to network connection!'
  //   })
  // }).finally(()=>{
  //   fetchFlag.value=false
  // })

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