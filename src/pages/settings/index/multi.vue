<template>
  <FormKit id="addMultiServerForm" type="form" ref="addMultiServerForm"  @submit="addMultiServerHandler"  :actions="false" >
    <row>
      <column md="6" col="12">
        <FormKit
            validation-label="IP Address"
            :validation="[['required'], ['matches', /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/]]"
            type="text"
            id="ip_address"
            name="ip_address"
            input-class=" font-main dark:text-primary-light-1"
            label="IP Address like: xxx.xxx.xxx.xxx"
            label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
            :floating-label="true"
        />
      </column>
      <column md="6" col="12">
        <FormKit
            validation-label="port"
            validation="required|min:1"
            type="number"
            min="1"
            id="server_port"
            name="server_port"
            input-class=" font-main dark:text-primary-light-1"
            label="Port"
            label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
            :floating-label="true"
        />
      </column>
    </row>
    <row>
      <column md="6" col="12">
        <FormKit
            validation-label="Username"
            validation="required"
            type="text"
            id="new_server_user"
            name="new_server_user"
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
            id="new_server_password"
            name="new_server_password"
            input-class=" font-main dark:text-primary-light-1"
            label="Password"
            label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
            :floating-label="true"
        />
      </column>
    </row>
  </FormKit>
  <div class="mt-1">
    <VBloader class="btn btn-indigo btn-md "
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
import VBloader from '../../../components/global/VBloader.vue'
import {ref} from "vue";
import {useAuthStore,envVariable,useServerStore} from "../../../composables/useStates";
import {querySerialize} from "../../../utils/Helper";
import {reset} from "@formkit/core";
import {useNotification} from "@kyvg/vue3-notification";
///////////////////////////////////
const {token}=useAuthStore()
const {apiBase}=envVariable()
const addMultiServerForm=ref<any>(null);
const fetchFlag=ref(false)
const { notify }  = useNotification()
const {serverStore}=useServerStore()

const addMultiServerHandler = (data) => {
  fetchFlag.value=true
  const query=querySerialize({
    ip_address:data.ip_address,
    port:data.server_port,
    user:data.new_server_user,
    password:data.new_server_password
  })
  fetch(apiBase+'add-server?'+query,{
    headers:{
      'Content-Type':'application/json',
      Authorization:`Bearer ${token.value}`
    },
  }).then(response=>response.json()).
  then(response=>{
    if(response.detail){
      notify({
        type:'error',
        title:'Add multi server',
        text:response.detail
      })
    }else{
      notify({
        type:'success',
        title:'Add multi server',
        text:'multi server added successfully!'
      })
      reset('addMultiServerForm')
      serverStore.fetchServersList()
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
  })
}

const submitForm = () => {
  if(addMultiServerForm.value){
    const node = (addMultiServerForm.value as any).node
    node.submit()
  }
};
</script>

<style scoped>

</style>