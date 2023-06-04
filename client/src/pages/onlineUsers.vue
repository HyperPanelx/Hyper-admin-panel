<template>
  <template v-if="fetchTableDataFlag">
    <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Online Users'}]" />
    <row class="mt-2">
      <column col="12">
        <VCard title="online users" body-class="!p-0">
          <PaginationControl @refresh="getOnlineUsers" />
          <OnlineTable :searchResultFlag="paginationData.searchResultFlag" :rows="paginationData.currentPageData" :titles="tableData.titles" />
          <Pagination />
        </VCard>
      </column>
    </row>

  </template>
</template>

<script setup lang="ts">
definePageMeta({
  name:'ONLINE',
  path:'/online'
});
const {paginationData}=usePagination();
const {tableData,fetchTableDataFlag,getOnlineUsers}=useOnlineUsers()



</script>

<style scoped>

</style>