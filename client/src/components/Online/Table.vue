<template>
  <div v-if="rows" class="table-responsive overflow-visible">
    <table class="w-full">
      <thead class="bg-primary-dark-1 dark:bg-primary-dark-2/50 text-primary-light-1 text-left font-500">
      <tr  class="w-full">
        <th></th>
        <th class=" capitalize cursor-pointer  py-1.5 pr-0.5 first:pl-1 pl-0.5" v-for="item in titles">
          <div >
            <p class="text-0.9 text-center"> {{item}}</p>
          </div>
        </th>
      </tr>
      </thead>
      <tbody v-if="searchResultFlag">
      <tr>
        <td colspan="7">
          <p class="text-center dark:text-primary-dark-3 uppercase  text-gray-800 p-2">
            no search result!
          </p>
        </td>
      </tr>
      </tbody>
      <tbody v-else-if="rows.length>0">
      <tr  :class="{'row-select':selectedOnlineUserToKill?.includes(item.user)}" class="table-hover td-border"  v-for="(item,index) in rows">
        <OnlineTableRow
            :user="item.user"
            :ip="item.ip"
            :uid="item.uid"
            :index="index"
        />
      </tr>
      </tbody>
      <tbody v-else-if="rows.length===0">
      <tr>
        <td colspan="7">
          <p class="text-center uppercase dark:text-primary-dark-3  text-gray-800 p-2">
            no users found!
          </p>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import OnlineTableRow from './TableRow.vue';
import {useTableStore} from "../../composables/useStates";
const props=defineProps<{
  titles:string[],
  rows:object[],
  searchResultFlag:boolean
}>();
const {selectedOnlineUserToKill}=useTableStore()
</script>

<style scoped>

</style>