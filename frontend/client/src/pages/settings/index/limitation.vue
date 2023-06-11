<template>
  <row>
    <column  col="12">
      <FormKit
          disabled=""
          v-model="limitationStatus"
          type="text"
          id="limitation_status"
          name="limitation_status"
          input-class="font-main"
          label="Limitation Status"
          label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
          :floating-label="true"
      />
    </column>
  </row>
  <div class="mt-1 flex  items-center">
    <VBloader class="btn mr-1 btn-success btn-md"
              animation="slide-down"
              :duration="2000"
              @click="changeStatus('Active')"
              :loading="fetchFlag.active "
    >
      Active
    </VBloader>
    <VBloader class="btn btn-rose btn-md"
              animation="slide-down"
              :duration="2000"
              @click="changeStatus('Deactive')"
              :loading="fetchFlag.deactive"
    >
      Deactive
    </VBloader>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import VBloader from '../../../components/global/VBloader.vue';
import {envVariable,useAuthStore} from "../../../composables/useStates";
const {apiBase,apiKey}=envVariable()
const { notify }  = useNotification()
const {token}=useAuthStore()
const limitationStatus=ref<string>('Active')
const fetchFlag=reactive({
  active:false,
  deactive:false
})


const changeStatus = (status:string) => {
  status==='Active' ? fetchFlag.active=true : fetchFlag.deactive=true
  fetch(apiBase+'/panel/user-limitation',{
    method:'POST',
    headers:{
      Authorization:apiKey,
      'Content-type':'application/json',
      token:token.value
    },
    body:JSON.stringify({status})
  }).then(response=>response.json()).then(response=>{
    if(response.detail){
      notify({
        type:'error',
        title:'Limitation Status',
        text:response.detail
      })
    }else{
      limitationStatus.value=response
      notify({
        type:'success',
        title:'Limitation Status',
        text:'Limitation Status changed successfully!'
      })
    }
  }).catch(err=>{
    console.log(err)
    notify({
      type:'error',
      title:'Limitation Status',
      text:'operation failed due to network connection!'
    })
  }).finally(()=>{
    fetchFlag.active=false
    fetchFlag.deactive=false
  })

}


</script>

<style scoped>

</style>