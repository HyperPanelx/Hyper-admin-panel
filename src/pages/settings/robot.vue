<template>
  <row class="mb-1">
    <column col="12">
      <h6 class="text-gray-800 dark:text-primary-dark-2 ">Telegram Robot Configuration</h6>
      <p class=" my-0.5 text-gray-800">
        <span class="!text-secondary-light-2">Step One:</span> Provide a domain and submit through SSH github command.
      </p>
      <p class=" mb-0.5 text-gray-800">
         <span class="!text-secondary-light-2"> Step Two:</span> Login with domain in panel and in setting enter token and manager telegram id.
      </p>
      <p class="text-gray-800 mb-0.5">
        If you are not familiar with token and manager telegram id ask in telegram group.
      </p>
      <p class="text-gray-800 mb-0.5">
        After submitting token and id send /start to robot and enjoy.
      </p>
    </column>
  </row>

  <div class="mb-1.5">
    <FormKit
        v-model="checkBoxFlag"
        type="checkbox"
        label="Do you Have Session file?"
        name="session_file_check"
    />
  </div>

  <template v-if="checkBoxFlag">
    <FormKit id="telegramRobotWithSessionFileForm" type="form" ref="telegramRobotWithSessionFileForm"  @submit="handlerFormWithSessionFile"  :actions="false" >
      <row>
        <column class="!pl-0" col="12">
          <FormKit
              validation="required"
              id="session_file"
              name="session_file"
              type="file"
              label="Session file"
              accept=".json"
              multiple="false"
          />
        </column>
      </row>
    </FormKit>
    <div class="mt-1">
      <VBloader class="btn btn-indigo btn-md"
                animation="slide-down"
                :duration="2000"
                @click="telegramRobotWithSessionFileFormHandler"
                :loading="fetchFlag"
      >
        Submit
      </VBloader>
    </div>
  </template>

  <template v-else>
    <FormKit  id="telegramRobotWithoutSessionFileForm" type="form" ref="telegramRobotWithoutSessionFileForm"  @submit="handlerFormWithoutSessionFile"  :actions="false" >
      <row>
        <column md="6" col="12">
          <FormKit
              validation-label="Token"
              validation="required"
              type="text"
              id="robot_token"
              name="robot_token"
              input-class=" font-main"
              label="Telegram Robot Token"
              label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
              :floating-label="true"
          />
        </column>
        <column md="6" col="12">
          <FormKit
              validation-label="Manager Id"
              validation="required"
              type="text"
              id="manager_id"
              name="manager_id"
              input-class=" font-main"
              label="Manager Id"
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
                @click="telegramRobotWithoutSessionFileFormHandler"
                :loading="fetchFlag"
      >
        Submit
      </VBloader>
    </div>
  </template>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { reset } from '@formkit/core'
import VBloader from '../../components/global/VBloader.vue';
import {envVariable,useAuthStore} from "../../composables/useStates";
////////////////////////////////
const {apiBase}=envVariable()
const { notify }  = useNotification()
const {token}=useAuthStore()
////////////////////////////////
const telegramRobotWithoutSessionFileForm=ref<any>(null);
const telegramRobotWithSessionFileForm=ref<any>(null);
const fetchFlag=ref(false)
const checkBoxFlag=ref<boolean>(false)

//////////////////////////////////////
const handlerFormWithSessionFile =async (data) => {
  // const fileReader=new FileReader()
  // await fileReader.readAsText(data.session_file[0].file)
  // fileReader.onload=()=>{
  //   if (typeof fileReader.result === "string") {
  //     fetchFlag.value=true
  //     fetch(apiBase+'/panel/telegram-robot?session_file=true',{
  //       headers:{
  //             'Content-Type':'application/json',
  //             Authorization:`Bearer ${token.value}`
  //       },
  //       body:JSON.stringify({
  //         file:JSON.parse(fileReader.result)
  //       })
  //     }).then(response=>response.json()).then((response)=>{
  //       if(response.error){
  //         notify({type:'error', title:'Telegram Robot Configuration', text:response.msg})
  //       }else{
  //         notify({type:'success', title:'Telegram Robot Configuration', text:'Telegram Robot configured successfully'})
  //         reset('telegramRobotWithSessionFileForm')
  //       }
  //     }).catch(err=>{
  //       console.log(err)
  //       notify({type:'error', title:'Telegram Robot Configuration', text:'operation failed due to network connection!'})
  //     }).finally(()=>{
  //       fetchFlag.value=false
  //     })
  //   }
  //
  // }
}
const handlerFormWithoutSessionFile = (data) => {
  // fetchFlag.value=true
  // fetch(apiBase+'/panel/telegram-robot?session_file=false',{
  //   headers:{
  //     'Content-Type':'application/json',
  //     Authorization:`Bearer ${token.value}`
  //   },
  //   body:JSON.stringify(data)
  // }).then(response=>response.json()).then((response)=>{
  //   if(response.error){
  //     notify({type:'error', title:'Telegram Robot Configuration', text:response.msg})
  //   }else{
  //     notify({type:'success', title:'Telegram Robot Configuration', text:'Telegram Robot configured successfully'})
  //     reset('telegramRobotWithoutSessionFileForm')
  //   }
  // }).catch(err=>{
  //   console.log(err)
  //   notify({type:'error', title:'Telegram Robot Configuration', text:'operation failed due to network connection!'})
  // }).finally(()=>{
  //   fetchFlag.value=false
  // })
}
const telegramRobotWithoutSessionFileFormHandler = () => {
  if(telegramRobotWithoutSessionFileForm.value){
    const node = (telegramRobotWithoutSessionFileForm.value as any).node
    node.submit()
  }
};
const telegramRobotWithSessionFileFormHandler = () => {
  if(telegramRobotWithSessionFileForm.value){
    const node = (telegramRobotWithSessionFileForm.value as any).node
    node.submit()
  }
}
</script>

<style scoped>

</style>