<template>
  <row >
    <column col="12" md="6">
      <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Servers'}]" />
    </column>
    <column col="12" md="6" class="flex justify-end">
      <button class="btn btn-primary" @click="goBack">
        back
      </button>
    </column>
  </row>
  <row class="my-1">
    <column col="12">
      <h3 class="text-gray-700 dark:text-primary-dark-2">Servers list</h3>
    </column>
  </row>
  <row v-if="serverStore.fetchServerListFlag">
    <column v-for="(server,index) in serverStore.serversList" col="12" md="4">
      <VCard body-class="relative group">
        <template v-slot:title>
          <div class="flex justify-between items-center w-full">
            <p>
              Server {{Number(index)+1}} <span class="!text-0.6">({{server.status}})</span>
            </p>
            <img :title="server.status" :src="server.status==='enable' ? lampOn : lampOff" width="40"/>
          </div>
        </template>
        <template v-slot:body>
          <p class="text-gray-600 dark:text-primary-dark-2">IP Address: {{server.host}}</p>
          <p class="text-gray-600 mt-0.5 mb-1 dark:text-primary-dark-2">Port: {{server.port}}</p>
          <img src="../public/server.png"/>
          <div class="absolute triangle top-0 right-0" v-if="getServerIP===server.host">
            <span class="block rotate-[43deg] translate-x-[38px] text-primary-light-1 translate-y-0">
               Active
            </span>
          </div>
          <div @click.self="changeServer(server.host,server.status)" class="absolute top-0 left-0 transition-all invisible group-hover:bg-secondary-light-2/30 group-hover:visible w-full h-full cursor-pointer flex justify-center items-center">
            <button @click="changeServer(server.host,server.status)" class="btn btn-primary">
              Switch
            </button>
          </div>
        </template>
      </VCard>
    </column>
  </row>

</template>

<script setup lang="ts">
import lampOn from '../public/lamp-on.svg'
import lampOff from '../public/lamp-off.svg'
import VCard from '../components/global/VCard.vue'
import VBreadcrumb from '../components/global/VBreadcrumb.vue'
import {useServerStore} from "../composables/useStates";
const {serverStore,getServerIP}=useServerStore()

const changeServer = (host:string,status:string) => {
  serverStore.changeServerIP(status,host)
}

const goBack = () => {
  history.back()
}
</script>

<style scoped>
.triangle{
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 5rem 5rem 0;
  border-color: transparent #727cf5 transparent transparent;
}
</style>