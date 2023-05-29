<template >
  <template v-if="fetchTableDataFlag">
    <div class="flex sm:flex-row flex-col sm:gap-0 gap-1 sm:items-center sm:justify-between mb-2">
      <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Users'}]" />
      <div>
        <NuxtLink :to="{name:'NEW_MAJOR_USER'}" class="btn btn-secondary mr-1">
          Create Users
        </NuxtLink>
        <NuxtLink :to="{name:'NEW_SINGLE_USER'}" class="btn btn-success ">
          New User
        </NuxtLink>
      </div>
    </div>
    <row>
      <column col="12">
        <VCard title="users list" body-class="!p-0">
          <div class="p-2 shadow-[inset_0_0px_5px_0_rgba(0,0,0,0.1)] overflow-hidden flex justify-between items-center">
            <FormKit type="form"  @submit="changePerPageHandler"  :actions="false" >
              <div class="flex gap-1 items-center">
                <FormKit
                    input-class="btn btn-indigo btn-md"
                    type="submit"
                    label="Apply"
                />
                <FormKit
                    type="select"
                    name="per_page"
                    input-class="select-dark"
                    :options="[
                  5,10,15,20,25
                ]"
                />
                <span class="text-0.7 text-gray-600 dark:text-primary-light-1">Entries per page</span>
              </div>
            </FormKit>
            <div class="flex gap-1 items-center">
              <FormKit
                  type="text"
                  input-class=" font-main"
                  label="Search username..."
                  label-class="dark:text-primary-dark-2 dark:!bg-[#37404a]  !font-main"
                  :floating-label="true"
                  @input="searchHandler"
                  v-model="searchText"
              />
              <button @click="resetSearch" class="btn btn-indigo btn-md">
                Reset
              </button>
            </div>
          </div>
          <VTable :searchResultFlag="paginationData.searchResultFlag" :rows="paginationData.currentPageData" :titles="tableData.titles" />
          <div class="pagination-section">
            <h6 class="text-gray-700 dark:text-primary-dark-3" >
              <template v-if="paginationData.searchResultFlag || paginationData.currentPageData.length===0">Showing page 1 of 1
              </template>
              <template v-else>Showing page {{paginationData.currentPage}} of {{paginationData.allPages}}
              </template>
            </h6>
            <div class="flex items-center gap-1">
              <button @click="previousPage" class="btn btn-primary !p-0.5">
                <Icon name="ri:arrow-left-s-line" size="1.7rem"/>
              </button>
              <template v-if="paginationData.allPages<4">
                <button :class="{'active':item===paginationData.currentPage}" @click="changePage(item)" v-for="item in paginationData.allPages" class="btn btn-primary btn-md">
                  {{item}}
                </button>
              </template>
             <template v-if="paginationData.allPages>3">
               <button v-if="paginationData.startShowPaginationButton>1" @click="showLessButton" class="btn btn-primary btn-md">
                 ...
               </button>
               <button :class="{'active':item===paginationData.currentPage}" @click="changePage(item)" v-for="item in declareNumberToArray(paginationData.allPages).slice(paginationData.startShowPaginationButton-1,paginationData.endShowPaginationButton)" class="btn btn-primary btn-md">
                 {{item}}
               </button>
               <button v-if="paginationData.endShowPaginationButton<paginationData.allPages" @click="showMoreButton" class="btn btn-primary btn-md">
                 ...
               </button>
             </template>
              <button @click="nextPage" class="btn btn-primary !p-0.5">
                <Icon name="ri:arrow-right-s-line" size="1.7rem"/>
              </button>
            </div>

          </div>
        </VCard>
      </column>
    </row>
  </template>

</template>

<script setup lang="ts">
import {declareNumberToArray} from '~/utils/Helper'
definePageMeta({
  name:'USERS'
});
const {tableData,fetchTableDataFlag}=useUsersList()
const {paginationData,changePerPageHandler,changePage,nextPage,previousPage,searchHandler,searchText,resetSearch,showMoreButton,showLessButton}=usePagination()


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