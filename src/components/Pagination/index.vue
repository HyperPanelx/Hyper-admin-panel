<template>
  <div class="pagination-section">
    <h6 class="text-gray-700 dark:text-primary-dark-3" >
      <template v-if="paginationData.searchResultFlag || paginationData.currentPageData.length===0">Showing page 1 of 1
      </template>
      <template v-else>Showing page {{paginationData.currentPage}} of {{paginationData.allPages}}
      </template>
    </h6>
    <div v-if="selectedUserToDelete.length>1 ">
      <button @click="selectOperation('Delete Users')" class="btn btn-rose ">
        Delete selected users
      </button>
    </div>
    <div v-if="selectedOnlineUserToKill.length>1 ">
      <button @click="selectOperation('Kill Connection')" class="btn btn-rose ">
        Kill selected users
      </button>
    </div>
    <div class="flex items-center [&_button]:mr-1">
      <button @click="previousPage" class="btn btn-indigo !p-[0.59rem]">
        <font-awesome-icon class="text-1.3" icon="fa-solid fa-chevron-left" size="1.7rem"/>
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
      <button @click="nextPage" class="btn btn-indigo !p-[0.59rem]">
        <font-awesome-icon class="text-1.3" icon="fa-solid fa-chevron-right" size="1.7rem"/>
      </button>
    </div>
  </div>
  <VModal :fade-outside="false" class="!p-0 !h-auto" v-model="modalData.on">
    <div class="modal-body">
      <p  class="text-1 text-gray-800 dark:text-primary-dark-3 flex items-center gap-0.5"> Are you sure?</p>
      <p class="text-gray-800 text-0.8 mt-0.7 dark:text-primary-dark-3">
        Action on <span class="text-secondary-light-2 text-0.8 ">{{getServerIP}}</span> server <router-link class="text-secondary-light-2 !text-[0.65rem] hover:underline ml-0.1" to="/servers">switch</router-link>
      </p>
      <row class="mt-1.5 justify-center">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">Operation: </p>
        </column>
        <column col="6">
          <p class="font-second dark:text-primary-light-1">{{modalData.name}}</p>
        </column>
      </row>
      <row class="mt-0.5">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">usernames:</p>
        </column>
        <column col="6">
          <p :title="selectedUserToDelete.join(',')" v-if="modalData.name==='Delete Users'" class="font-second dark:text-primary-light-1 w-11 text-hidden">{{selectedUserToDelete.join(',')}}</p>
          <p :title="selectedOnlineUserToKill.join(',')" v-if="modalData.name==='Kill Connection'" class="font-second dark:text-primary-light-1 w-11 text-hidden">{{selectedOnlineUserToKill.join(',')}}</p>
        </column>
      </row>
    </div>
    <div class="modal-footer">
      <button @click="deleteSelectedUsers" v-if="modalData.name==='Delete Users'" class="btn btn-secondary btn-sm" >
        Ok
      </button>
      <button @click="killSelectedUsers" v-if="modalData.name==='Kill Connection'" class="btn btn-secondary btn-sm" >
        Ok
      </button>
      <button class="btn btn-indigo btn-sm" @click="modalData.on=false">
        Close
      </button>
    </div>
  </VModal>

</template>

<script setup lang="ts">
import {usePagination} from "../../composables/usePagination";
import {declareNumberToArray} from '../../utils/Helper';
import {useTableStore,useServerStore} from "../../composables/useStates";
import VModal from '../../components/global/VModal.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const {paginationData,selectedUserToDelete,selectedOnlineUserToKill}=useTableStore()
const {changePage,nextPage,previousPage,showMoreButton,showLessButton,deleteSelectedUsers,killSelectedUsers,selectOperation,modalData}=usePagination();
const {getServerIP}=useServerStore()
</script>

<style scoped>

</style>