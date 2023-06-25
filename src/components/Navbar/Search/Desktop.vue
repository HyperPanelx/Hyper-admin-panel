<template>
  <VDropdown min-height="10rem" dropdown-class="dark:bg-primary-dark-1 dark:!border-primary-dark-2/50" v-bind="$attrs" max-height="24rem" class="lg:flex hidden " @close="emit('update:modelValue',false)" :on="modelValue">
    <template v-slot:parent>
      <VGInput
          v-model="searchData.searchContent"
          placeholder="Search..."
          icon="fa-solid fa-magnifying-glass"
          :delay="false"
          input-class="!pb-0.5"
      />
      <button @click="searchHandler" class="btn btn-primary btn-sm">
        Search
      </button>
    </template>
    <template v-slot:content>
      <div class="flex justify-between items-center p-1">
        <p class="text-0.9 font-600 text-gray-700 dark:text-primary-dark-3">
          Found <span class="text-red-600 text-1.1">{{searchData.searchResult.length}}</span> results
        </p>
        <font-awesome-icon  @click="closeResult" class="text-gray-600 cursor-pointer relative z-[100] text-1.4 dark:text-primary-dark-3" icon="fa-solid fa-xmark" />
      </div>
      <div v-if="!searchData.searchResultFlag" class="search-result-box">
        <half-circle-spinner
            :animation-duration="1000"
            :size="60"
            color="#727cf5"
        />
      </div>
      <div v-else class="my-0.5 max-h-[19.5rem] overflow-y-auto scroller">
        <template v-if="searchData.searchResult.length>0">
          <p class="uppercase text-gray-700 px-1 text-0.8 mb-0.5 dark:text-primary-dark-3">Users</p>
          <router-link @click="closeResult" :to="{name:'USERS',query:{username:item}}" v-for="item in searchData.searchResult" class="search-result-item">
            <img alt="profile" width="30" src="../../../public/profiles/profile_2.svg" />
            <div>
              <p class="text-0.8 text-gray-700 font-600 dark:text-primary-dark-3">{{item}}</p>
              <p class="text-0.7 text-gray-700 dark:text-primary-dark-3">User</p>
            </div>
          </router-link>
        </template>
        <p v-else class="text-center text-gray-600 mt-1">Nothing found.</p>
      </div>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import  VGInput from '../../global/VGInput.vue'
import VDropdown from '../../global/VDropdown.vue'
import {useSearch} from "../../../composables/useSearch";
import { HalfCircleSpinner } from 'epic-spinners';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const props=defineProps<{
  modelValue:any
}>();
const emit=defineEmits<{
  (e:'update:modelValue',value:boolean):void
}>();
const {searchHandler,searchData,closeResult}=useSearch(props,emit)

</script>

<style scoped>

</style>