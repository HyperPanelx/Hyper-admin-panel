<template >
  <template v-if="fetchTableDataFlag">
    <div class="flex sm:flex-row flex-col sm:gap-0 gap-1 sm:items-center sm:justify-between mb-2">
      <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Users'}]" />
      <NuxtLink :to="{name:'CREATE_USER'}" class="btn btn-success ">
        Add New User
      </NuxtLink>
    </div>
    <row>
      <column col="12">
        <VCard title="users list" class="!overflow-visible" body-class="!p-0">
          <PaginationControl />
          <UsersTable v-if="paginationData.currentPageData" :searchResultFlag="paginationData.searchResultFlag" :rows="paginationData.currentPageData" :titles="tableData.titles" />
          <Pagination />
        </VCard>
      </column>
    </row>
  </template>
</template>

<script setup lang="ts">
definePageMeta({
  name:'USERS'
});
const {tableData,fetchTableDataFlag}=useUsersList();
const {paginationData}=usePagination();


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