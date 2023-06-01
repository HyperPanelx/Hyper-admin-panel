<template>
  <div class="pagination-section">
    <h6 class="text-gray-700 dark:text-primary-dark-3" >
      <template v-if="paginationData.searchResultFlag || paginationData.currentPageData.length===0">Showing page 1 of 1
      </template>
      <template v-else>Showing page {{paginationData.currentPage}} of {{paginationData.allPages}}
      </template>
    </h6>
    <div v-if="selectedUserToDelete.length>1">
      <button @click="deleteSelectedUser" class="btn btn-rose ">
        Delete selected users
      </button>
    </div>
    <div class="flex items-center gap-1">
      <button @click="previousPage" class="btn btn-indigo !p-0.5">
        <Icon name="ri:arrow-left-s-line" size="1.7rem"/>
      </button>
      <template v-if="paginationData.allPages<4">
        <button :class="{'active':item===paginationData.currentPage}" @click="changePage(item)" v-for="item in paginationData.allPages" class="btn btn-indigo btn-md">
          {{item}}
        </button>
      </template>
      <template v-if="paginationData.allPages>3">
        <button v-if="paginationData.startShowPaginationButton>1" @click="showLessButton" class="btn btn-indigo btn-md">
          ...
        </button>
        <button :class="{'active':item===paginationData.currentPage}" @click="changePage(item)" v-for="item in declareNumberToArray(paginationData.allPages).slice(paginationData.startShowPaginationButton-1,paginationData.endShowPaginationButton)" class="btn btn-indigo btn-md">
          {{item}}
        </button>
        <button v-if="paginationData.endShowPaginationButton<paginationData.allPages" @click="showMoreButton" class="btn btn-indigo btn-md">
          ...
        </button>
      </template>
      <button @click="nextPage" class="btn btn-indigo !p-0.5">
        <Icon name="ri:arrow-right-s-line" size="1.7rem"/>
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">
import {usePagination} from "~/composables/usePagination";
import {declareNumberToArray} from '~/utils/Helper'
const {paginationData,changePage,nextPage,previousPage,showMoreButton,showLessButton,deleteSelectedUser}=usePagination();
const {selectedUserToDelete}=useStates();
</script>

<style scoped>

</style>