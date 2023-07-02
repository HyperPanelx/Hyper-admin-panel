<template>
  <div v-if="rows" class="table-responsive md:!overflow-visible">
    <table class="w-full">
      <TableHead :titles="titles"/>

      <tbody v-if="searchResultFlag">
      <tr>
        <td colspan="8">
          <p class="text-center dark:text-primary-dark-3 uppercase  text-gray-800 p-2">
            no search result!
          </p>
        </td>
      </tr>
      </tbody>
      <tbody v-else-if="rows.length>0">
      <slot />
      </tbody>
      <tbody v-else-if="rows.length===0">
      <tr>
        <td colspan="8">
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
import TableHead from '../Table/Head.vue'
const props=defineProps<{
  titles:string[]
  rows:object[],
  searchResultFlag:boolean
}>();
</script>

<style scoped>

</style>