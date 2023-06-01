<template>
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
          @keyup="searchHandler"
          v-model="searchText"
      />
      <button @click="resetSearch" class="btn btn-indigo btn-md">
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {usePagination} from "~/composables/usePagination";
const {changePerPageHandler,searchHandler,searchText,resetSearch}=usePagination();

</script>

<style scoped>

</style>