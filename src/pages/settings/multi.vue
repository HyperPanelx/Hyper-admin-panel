<template>
  <FormKit id="addMultiServerForm" type="form" ref="addMultiServerForm"  @submit="addMultiServerHandler"  :actions="false" >
    <row class="px-1.5 pt-1">
      <column md="6" col="12">
        <FormKit
            type="custom_text"
            label="ip address"
            id="ip_address"
            name="ip_address"
            validation-label="ip address"
            :validation="[['required'], ['matches', /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/]]"
           help="format: xxx.xxx.xxx.xxx"
        />

      </column>
      <column md="6" col="12">
        <FormKit
            type="custom_number"
            label="port"
            id="server_port"
            name="server_port"
            validation-label="port"
            validation="required|min:1"
            min="1"
        />
      </column>
    </row>
    <row class="mt-0.7 px-1.5">
      <column md="6" col="12">
        <FormKit
            validation-label="username"
            validation="required"
            type="custom_text"
            id="new_server_user"
            name="new_server_user"
            label="username"
        />
      </column>
      <column md="6" col="12">
        <FormKit
            validation-label="password"
            :validation="[['required'], ['matches', /^.{3,20}$/]]"
            help="Between 3 and 20 characters."
            type="custom_password"
            id="new_server_password"
            name="new_server_password"
            label="password"
            suffix-icon="eyeClosed"
            @suffix-icon-click="handleIconClick"
        />
      </column>
    </row>
  </FormKit>
  <div class="mt-1 modal-footer">
    <VBloader class="btn  btn-indigo btn-md "
              animation="slide-down"
              :duration="2000"
              @click="submitForm"
              :loading="fetchFlag"
    >
      Submit
    </VBloader>
    <button  @click="emit('close')" class="btn btn-secondary btn-sm" >
      Close
    </button>
  </div>
</template>

<script setup lang="ts">
import {IResponse} from "../../utils/Types";
import VBloader from '../../components/global/VBloader.vue'
import {ref} from "vue";
import {useAuthStore,envVariable,useServerStore} from "../../composables/useStates";
import {querySerialize,handleIconClick} from "../../utils/Helper";
import {reset} from "@formkit/core";
import {useNotification} from "@kyvg/vue3-notification";
///////////////////////////////////
const {token}=useAuthStore()
const {apiBase}=envVariable()
const addMultiServerForm=ref<any>(null);
const fetchFlag=ref(false)
const { notify }  = useNotification()
const {serverStore}=useServerStore()
const emit=defineEmits<{
  (e:'close'):void
}>();
const addMultiServerHandler = (data) => {
  fetchFlag.value=true
  const query=querySerialize({
    ip_address:data.ip_address,
    port:data.server_port,
    user:data.new_server_user,
    password:data.new_server_password
  })
  fetch(apiBase+'server-add?'+query,{
    headers:{
      'Content-Type':'application/json',
      Authorization:`Bearer ${token.value}`
    },
  }).then(response=>response.json()).
  then((response:IResponse<any> )=>{
    if(response.success){
      notify({
        type:'success',
        title:'Add multi server',
        text:'multi server added successfully!'
      })
      reset('addMultiServerForm')
      serverStore.fetchServersList()
    }else{
      notify({
        type:'error',
        title:'Add multi server',
        text:response.message
      })
    }
  }).catch(err=>{
    console.log(err)
    notify({
      type:'error',
      title:'Add multi server',
      text:'operation failed due to network connection!'
    })
  }).finally(()=>{
    fetchFlag.value=false
    emit('close')
  })
}

const submitForm = () => {
  if(addMultiServerForm.value){
    const node = (addMultiServerForm.value as any).node
    node.submit()
  }
};
</script>

<style >
@tailwind components;
@layer components {
  #addMultiServerForm .formkit-messages .formkit-message{
    @apply px-1.5
  }
}

</style>