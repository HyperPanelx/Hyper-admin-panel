<template>
  <template v-if="fetchTableDataFlag">
    <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Online Users'}]" />
    <row class="mt-2">
      <column col="12">
        <VCard  body-class="!p-0" class="!overflow-visible">
          <template v-slot:title>
            online users on <span class="text-secondary-light-2">{{getServerIP}}</span> server <router-link class="text-secondary-light-2 !text-[0.65rem] hover:underline" to='/servers'>Switch</router-link>
          </template>
          <template v-slot:body>
            <PaginationControl :sort="false" @refresh="tableStore.getOnlineUsers()" />
            <Table  v-if="paginationData.currentPageData"
                    :searchResultFlag="paginationData.searchResultFlag"
                    :rows="paginationData.currentPageData"
                    :titles="tableData.titles"
            >
              <tr
                  :class="{'row-select':selectedOnlineUserToKill?.includes(item.user)}" class="table-hover td-border relative"
                  v-for="(item,index) in paginationData.currentPageData">
                <OnlineTableRow
                    :user="item.user"
                    :ip="item.ip"
                    :uid="item.uid"
                    :index="index"
                />
              </tr>


            </Table>
            <Pagination />
          </template>

        </VCard>
      </column>
    </row>

  </template>
</template>

<script setup lang="ts">
import OnlineTableRow from '../components/Online/TableRow.vue'
import Table from '../components/Table/index.vue'
import VCard from '../components/global/VCard.vue'
import VBreadcrumb from '../components/global/VBreadcrumb.vue'
import Pagination from '../components/Pagination/index.vue'
import PaginationControl from '../components/Pagination/Control.vue'
import {useTableStore,useServerStore} from "../composables/useStates";
import {onMounted} from "vue";
const {paginationData,tableData,fetchTableDataFlag,tableStore}=useTableStore();
const {getServerIP}=useServerStore()
onMounted(async ()=>{
  await tableStore.getOnlineUsers()
})
const {selectedOnlineUserToKill}=useTableStore()


</script>

<style >
@tailwind components;
@layer components {
  .formkit-outer{
    @apply !mb-0
  }
  .formkit-input{
    @apply !border-[1px] !border-gray-100/50 dark:!text-primary-light-1 font-main
  }
  .pagination-section{
    @apply bg-gray-100 p-2 flex md:justify-between justify-center items-center items-center md:flex-row flex-col gap-1 md:gap-0 dark:bg-[rgb(70,79,91)];
  }
}
</style>