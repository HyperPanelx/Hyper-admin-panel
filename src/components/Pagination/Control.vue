<template>
  <div class="py-2 px-1 shadow-[inset_0_0px_5px_0_rgba(0,0,0,0.1)] overflow-visible flex md:flex-row flex-col md:justify-between md:items-center">
    <FormKit type="form" id="control-pagination-form"  @submit="changePerPageHandler"  :actions="false" >
      <div class="flex gap-0.5 items-center">
        <div v-if="sort" class="w-9">
          <VSelect
              @fire="sortHandler($event)"
              id="sort"
              init="sort by"
              :search="false"
              :placeholder="true"
              :reset="resetPaginationControl"
              :list="[
                'disable',
                'enable',
                'expired',
                'expire soon',
                ...getHostList
            ]"
          />
        </div>
        <div class="w-4">
          <VSelect
              @fire="changePerPageHandler($event)"
              :search="false"
              id="per_page"
              init="5"
              :placeholder="false"
              :reset="resetPaginationControl"
              :list="[
                  '5','10','15','20','25'
                ]"
          />
        </div>
        <span class="text-0.7 text-gray-600 dark:text-primary-light-1">Entries per page</span>
      </div>
    </FormKit>
    <div class="flex md:flex-row flex-col  md:mt-0 mt-2 items-center">
      <FormKit
          type="custom_placeholder"
          label="search username..."
          id="search_username"
          name="search_username"
          @keyup="searchHandler"
          v-model="tableStore.searchText"

      />

      <div class="w-full md:ml-1 ml-0 mt-1 md:mt-0">
        <button @click="resetSearch" class="btn btn-indigo btn-md mr-1">
          Reset
        </button>
        <button @click="emit('refresh')" class="btn btn-indigo btn-md">
          Refresh Data
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VSelect from '../global/VSelect.vue'
import {usePagination} from "../../composables/usePagination";
import {useTableStore,useServerStore} from "../../composables/useStates";
const {getHostList}=useServerStore()
const props=defineProps<{
  sort:boolean
}>()
const emit=defineEmits<{
  (e:'refresh'):void
}>();
const {tableStore,resetPaginationControl}=useTableStore()
const {changePerPageHandler,searchHandler,resetSearch,sortHandler}=usePagination();

</script>

<style scoped>
@tailwind components;
@layer components {
  .choices{
    @apply !w-[100%] m-0
  }
}
</style>