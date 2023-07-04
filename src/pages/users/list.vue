<template >
  <template v-if="fetchTableDataFlag">
    <div class="flex sm:flex-row flex-col  sm:items-center sm:justify-between mb-2">
      <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Users'}]" />
      <div class="sm:mt-0 mt-1">
        <router-link  :to="{name:'GENERATE_USER'}" class="btn btn-success mr-1">
          Generate New Users
        </router-link>
        <router-link :to="{name:'CREATE_USER'}" class="btn btn-success ">
          Add New User
        </router-link>
      </div>
    </div>
    <row>
      <column col="12">
        <VCard title="users list" class="!overflow-visible" body-class="!p-0">
          <PaginationControl :sort="true"  @refresh="tableStore.getUsersList()"/>
          <Table v-if="paginationData.currentPageData"
                 :searchResultFlag="paginationData.searchResultFlag"
                 :rows="paginationData.currentPageData"
                 :titles="tableData.titles" >
            <tr class="table-hover td-border relative" :class="{'row-select':selectedUserToDelete?.includes(item.user)}"  v-for="item in paginationData.currentPageData">
              <UsersTableRow
                  :user="item.user"
                  :traffic="item.traffic"
                  :usedVolume="item.usedVolume"
                  :multi="item.multi"
                  :phone="item.phone"
                  :email="item.email"
                  :registered="item.registered"
                  :exdate="item.exdate"
                  :status="item.status"
                  :uid="item.uid"
                  :passwd="item.passwd"
                  :telegram_id="item.telegram_id"
                  :desc="item.desc"
                  :referral="item.referral"
                  :server="item.server"
                  :ordered_by="item.ordered_by"
              />
            </tr>
          </Table>
          <Pagination />
        </VCard>
      </column>
    </row>
  </template>
</template>

<script setup lang="ts">
import Table from '../../components/Table/index.vue';
import UsersTableRow from '../../components/Users/TableRow.vue'
import  VBreadcrumb from '../../components/global/VBreadcrumb.vue';
import VCard from '../../components/global/VCard.vue'
import PaginationControl from '../../components/Pagination/Control.vue'
import Pagination from '../../components/Pagination/index.vue'
import {useTableStore} from "../../composables/useStates";
import {onMounted} from "vue";
const {paginationData,tableStore,fetchTableDataFlag,tableData}=useTableStore()
onMounted(async ()=>{
  await tableStore.getUsersList()
})
const {selectedUserToDelete}=useTableStore()

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