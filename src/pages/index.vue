<template>
  <DefaultLayout>
    <VPreloader :on="showPreloaderFlag" :freeze="freezeAppFlag" />
    <FAB
        :items="settingTabItems"
        fab-icon="fa-solid fa-gear"
    />
    <VModal :fade-outside="true" @close="closeModal" class="!p-0 !h-auto" v-model="modalFlag">
      <div class="modal-body !px-0 !pb-0">
        <p class="capitalize px-1.5 text-1.1 dark:text-secondary-light-1 mt-1 mb-0.5 text-primary-dark-1">{{String(route.query.section).split('-').join(' ')}}</p>
        <component @close="closeModal" :is="selected_component"/>
      </div>
    </VModal>
    <router-view></router-view>
  </DefaultLayout>
</template>

<script setup lang="ts">
///// setting components
import create from './settings/create.vue'
import changePassword from './settings/changePassword.vue'
import multi from './settings/multi.vue'
import api from './settings/api.vue'
import backup from './settings/backup.vue'
import ip from './settings/ip.vue'
import SSH from './settings/SSH.vue'
import robot from './settings/robot.vue'
import limitation from './settings/limitation.vue'
//////
import VModal from '../components/global/VModal.vue'
import {useRoute,useRouter} from "vue-router";
import {settingTabItems} from "../utils/Helper";
import FAB from '../components/Setting/FAB.vue'
import DefaultLayout from '../layouts/default.vue'
import VPreloader from '../components/global/VPreloader.vue'
import {useDashboardStore,useServerStore} from "../composables/useStates";
import {useRouteLoader} from "../composables/useRouteLoader";
import {onMounted,watch,ref} from "vue";
////////
const route=useRoute();
const router=useRouter();
const {showPreloaderFlag}=useDashboardStore();
const {freezeAppFlag}=useServerStore();
const modalFlag=ref(false)
let selected_component=null
const closeModal = () => {
  modalFlag.value=false
  router.push({query:null})
}

watch(
    ()=>route.query.page,
    ()=>{
      if(route.query.section){
        const section=route.query.section;
        selected_component=section==='create-admin-user' ? create : section==='change-password' ? changePassword : section==='add-multi-server' ? multi : section==='ssh-port' ? SSH : section==='api' ? api : section==='user-limitation' ? limitation : section==='telegram-robot' ? robot : section==='backup-and-restore' ? backup : section==='ip-block' ? ip : null;
        modalFlag.value=true
      }
    }
)

useRouteLoader();



</script>

<style scoped>

</style>