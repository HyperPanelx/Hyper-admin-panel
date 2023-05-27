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
                    :options="[
                  5,10,15,20,25
                ]"
                />
                <span class="text-0.7 text-gray-600">Entries per page</span>
              </div>
            </FormKit>
            <div class="flex gap-1 items-center">
              <FormKit
                  input-class="v-input-float"
                  type="text"
                  label="Search username..."
                  :floating-label="true"
                  @input="searchHandler"
                  v-model="searchText"
              />
              <button @click="resetSearch" class="btn btn-indigo btn-md">
                Reset
              </button>
            </div>
          </div>
          <VTable :rows="paginationData.currentPageData" :titles="tableData.titles" />
          <div class="bg-gray-100 p-2 flex md:justify-between justify-center items-center items-center md:flex-row flex-col gap-1 md:gap-0">
            <h6 class="text-gray-700">Showing page {{paginationData.currentPage}} of {{paginationData.allPages}} </h6>
            <div class="flex items-center gap-1">
              <button @click="previousPage" class="btn btn-primary !p-0.5">
                <Icon name="ri:arrow-left-s-line" size="1.7rem"/>
              </button>
              <button :class="{'active':item===paginationData.currentPage}" @click="changePage(item)" v-for="item in paginationData.allPages" class="btn btn-primary btn-md">
                {{item}}
              </button>
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
definePageMeta({
  name:'USERS'
});
const {tableData,fetchTableDataFlag}=useUsersList()
const {paginationData,changePerPageHandler,changePage,nextPage,previousPage,searchHandler,searchText,resetSearch}=usePagination()



</script>

<style scoped>
@tailwind components;
@layer components {
  .formkit-outer{
    @apply !mb-0
  }
}
</style>