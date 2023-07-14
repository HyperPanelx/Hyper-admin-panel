<template>
  <row>
    <column  col="12">
      <FormKit
          disabled=""
          v-model="limitationStatus"
          type="custom_text"
          id="limitation_status"
          name="limitation_status"
          label="Limitation Status"
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
const {apiBase}=envVariable()
const { notify }  = useNotification()
const {token}=useAuthStore()
const limitationStatus=ref<string>('Active')
const fetchFlag=reactive({
  active:false,
  deactive:false
})


const changeStatus = (status:string) => {
  status==='Active' ? fetchFlag.active=true : fetchFlag.deactive=true
  ////
  fetchFlag.active=false
  fetchFlag.deactive=false
  notify({
          type:'success',
          title:'Limitation Status',
          text:'Limitation Status changed successfully!'
  })
  ////
  // fetch(apiBase+'/panel/user-limitation',{
  //     headers:{
  //       'Content-Type':'application/json',
  //       Authorization:`Bearer ${token.value}`
  //     },
  // }).then(response=>response.json()).then((response)=>{
  //   if(response.error){
  //     notify({
  //       type:'error',
  //       title:'Limitation Status',
  //       text:response.msg
  //     })
  //   }else{
  //     limitationStatus.value=response.data.status
  //     notify({
  //       type:'success',
  //       title:'Limitation Status',
  //       text:'Limitation Status changed successfully!'
  //     })
  //   }
  // }).catch(err=>{
  //   console.log(err)
  //   notify({
  //     type:'error',
  //     title:'Limitation Status',
  //     text:'operation failed due to network connection!'
  //   })
  // }).finally(()=>{
  //   fetchFlag.active=false
  //   fetchFlag.deactive=false
  // })

}


</script>

<style scoped>

</style>