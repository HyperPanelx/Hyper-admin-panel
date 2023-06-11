<template>
  <template v-if="fetchTableDataFlag">
    <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Online Users'}]" />
    <row class="mt-2">
      <column col="12">
        <VCard title="online users" body-class="!p-0">
          <PaginationControl @refresh="tableStore.getOnlineUsers()" />
          <Table  v-if="paginationData.currentPageData"
                  :searchResultFlag="paginationData.searchResultFlag"
              :rows="paginationData.currentPageData"
              :titles="tableData.titles"
          >
            <tr
                :class="{'row-select':selectedOnlineUserToKill?.includes(item.user)}" class="table-hover td-border"
                v-for="(item,index) in paginationData.currentPageData">
              <OnlineTableRow
                  :user="item.user"
                  :ip="item.ip"
                  :uid="item.uid"
                  :index="index"
              />
            </tr>


          </Table>


<!--          <OnlineTable :searchResultFlag="paginationData.searchResultFlag" :rows="paginationData.currentPageData" :titles="tableData.titles" />-->
          <Pagination />
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
import {useTableStore} from "../composables/useStates";
import {onMounted} from "vue";
const {paginationData,tableData,fetchTableDataFlag,tableStore}=useTableStore()
onMounted(async ()=>{
  await tableStore.getOnlineUsers()
})
const {selectedOnlineUserToKill}=useTableStore()


</script>

<style scoped>

</style>