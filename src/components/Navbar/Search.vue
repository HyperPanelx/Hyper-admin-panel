<template>
  <VDropdown class="flex" :on="openDropdownFlag">
    <template v-slot:parent>
      <VGInput
          v-model="searchContent"
          placeholder="Search..."
          icon="mdi:magnify"
          :delay="false"
      />
      <button @click="triggerSearch" class="btn btn-primary btn-sm">
        Search
      </button>
    </template>
    <template v-slot:content>
      <div class="flex justify-between items-center p-1">
        <p class="text-1 text-gray-700">
          Found <span class="text-red-600 text-1.1">{{searchResult.length}}</span> results
        </p>
        <Icon  size="1.4rem" @click="openDropdownFlag=false" class="text-gray-600 cursor-pointer" name="heroicons-outline:x" />
      </div>
      <div v-if="!searchResultFlag" class="search-result-box">
        <half-circle-spinner
            :animation-duration="1000"
            :size="60"
            color="#727cf5"
        />
      </div>
      <div v-else class="my-0.5 h-[82%] overflow-y-scroll">
        <p class="uppercase text-gray-700 px-1 text-0.8 mb-0.5">Users</p>
        <NuxtLink :to="{name:item.link}" v-for="item in searchResult" class="search-result-item">
          <nuxt-img width="35" :src="item.img"/>
          <div>
            <p class="text-0.9 text-gray-700 font-600">{{item.name}}</p>
            <p class="text-0.8 text-gray-700">{{item.rule}}</p>
          </div>
        </NuxtLink>
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