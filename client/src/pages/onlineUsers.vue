<template>
  <template v-if="fetchTableDataFlag">
    <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Online Users'}]" />
    <row class="mt-2">
      <column col="12">
        <VCard title="online users" body-class="!p-0">
          <PaginationControl @refresh="tableStore.getOnlineUsers()" />
          <OnlineTable :searchResultFlag="paginationData.searchResultFlag" :rows="paginationData.currentPageData" :titles="tableData.titles" />
          <Pagination />
        </VCard>
      </column>
    </row>

  </template>
</template>

<script setup lang="ts">
import VCard from '../components/global/VCard.vue'
import OnlineTable from '../components/Online/Table.vue'
import VBreadcrumb from '../components/global/VBreadcrumb.vue'
import Pagination from '../components/Pagination/index.vue'
import PaginationControl from '../components/Pagination/Control.vue'
import {useTableStore} from "../composables/useStates";
import {onMounted} from "vue";
const {paginationData,tableData,fetchTableDataFlag,tableStore}=useTableStore()
onMounted(async ()=>{
  await tableStore.getOnlineUsers()
})


</script>

<style scoped>

</style>