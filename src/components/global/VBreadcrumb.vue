<template>
  <div class="page-navigation">
      <ul class="flex flex-row items-center ">
        <template v-for="(item,index) in pages">
          <li class="capitalize text-[0.9rem] mr-0.8 text-gray-600 font-500" :class="{'!link !text-blue-700 !cursor-pointer !text-secondary-light-2':item.link}">
            <router-link v-if="item.link" :to="{name:item.link}">
              {{item.name}}
            </router-link>
            <span class="dark:text-primary-light-1" v-else>{{item.name}}</span>
          </li>
          <li>
            <span :class="{'!text-blue-700':item.link}" class="text-[0.9rem] mr-0.8 text-gray-600 dark:text-primary-light-1" v-if="index!==pages.length-1">></span>
          </li>
        </template>
      </ul>
  </div>
</template>

<script setup>
let props=defineProps(['pages'])




</script>

