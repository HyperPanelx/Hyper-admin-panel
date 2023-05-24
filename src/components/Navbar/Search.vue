<template>
  <VDropdown min-height="10rem"  max-height="24rem" class="flex" v-model="openDropdownFlag">
    <template v-slot:parent>
      <VGInput
          v-model="searchContent"
          placeholder="Search..."
          icon="mdi:magnify"
          :delay="false"
          input-class="!pb-0.5"
      />
      <button @click="triggerSearch" class="btn btn-primary btn-sm">
        Search
      </button>
    </template>
    <template v-slot:content>
      <div class="flex justify-between items-center p-1">
        <p class="text-0.9 font-600 text-gray-700">
          Found <span class="text-red-600 text-1.1">{{searchResult.length}}</span> results
        </p>
        <Icon  size="1.4rem" @click="openDropdownFlag=false" class="text-gray-600 cursor-pointer relative z-[100]" name="heroicons-outline:x" />
      </div>
      <div v-if="!searchResultFlag" class="search-result-box">
        <half-circle-spinner
            :animation-duration="1000"
            :size="60"
            color="#727cf5"
        />
      </div>
      <div v-else class="my-0.5 max-h-[19.5rem] overflow-y-auto">
        <template v-if="searchResult.length>0">
          <p class="uppercase text-gray-700 px-1 text-0.8 mb-0.5">Users</p>
          <NuxtLink  :to="{name:item.link}" v-for="item in searchResult" class="search-result-item">
            <nuxt-img width="30" :src="item.img"/>
            <div>
              <p class="text-0.8 text-gray-700 font-600">{{item.name}}</p>
              <p class="text-0.7 text-gray-700">{{item.rule}}</p>
            </div>
          </NuxtLink>
        </template>
        <p v-else class="text-center text-gray-600 mt-1">Nothing found.</p>
      </div>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import { HalfCircleSpinner } from 'epic-spinners'
const {triggerSearch,searchContent,searchResultFlag,openDropdownFlag,searchResult}=useSearch()

</script>

<style scoped>

</style>