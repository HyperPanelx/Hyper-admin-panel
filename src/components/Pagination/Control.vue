<template>
  <div class="py-2 px-1 shadow-[inset_0_0px_5px_0_rgba(0,0,0,0.1)] overflow-hidden flex md:flex-row flex-col md:justify-between md:items-center">
    <FormKit type="form"  @submit="changePerPageHandler"  :actions="false" >
      <div class="flex gap-0.5 items-center">
        <FormKit
            input-class="btn btn-indigo btn-md"
            type="submit"
            label="Apply"
        />
        <FormKit
            v-if="sort"
            type="select"
            name="sort"
            placeholder="sort by"
            input-class="select-dark"
            :options="[
                'disable',
                'enable',
                'expired',
                'expire soon',
            ]"
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
    <div class="flex md:flex-row flex-col  md:mt-0 mt-2 items-center">
      <FormKit
          type="text"
          outer-class="w-full"
          input-class=" font-main"
          label="Search username..."
          label-class="dark:text-primary-dark-2 dark:!bg-[#37404a]  !font-main"
          :floating-label="true"
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
import {usePagination} from "../../composables/usePagination";
import {useTableStore} from "../../composables/useStates";
const props=defineProps<{
  sort:boolean
}>()
const emit=defineEmits<{
  (e:'refresh'):void
}>();
const {tableStore}=useTableStore()
const {changePerPageHandler,searchHandler,resetSearch}=usePagination();

</script>

<style scoped>

</style>