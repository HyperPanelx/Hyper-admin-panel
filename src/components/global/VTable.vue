<template>
 <div class="table-responsive">
   <table class="w-full">
     <thead class="bg-primary-dark-1 dark:bg-primary-dark-2/50 text-primary-light-1 text-left font-500">
     <tr  class="w-full">
       <th class=" capitalize cursor-pointer  py-1.5 pr-0.5 first:pl-1 pl-0.5" v-for="item in titles">
        <div class="w-[5.9rem]">
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
     <tr   v-for="item in rows">
       <td class="td-shadow">
         <div class="p-1 ">
           <p class="mb-0.5 text-gray-800 dark:text-primary-dark-3 flex items-center gap-1">
             <Icon name="ri:account-circle-fill" size="1.2rem"/>
             {{item.username}}
           </p>
           <p class=" text-gray-800 dark:text-primary-dark-3  flex items-center gap-1">
             <Icon name="ri:key-fill" size="1.2rem"/>
             {{item.password}}
           </p>
         </div>
       </td>
       <td  class="td-shadow">
         <div class=" p-1">
           <p class="dark:text-primary-dark-3 text-gray-800 mb-0.5 !text-0.8">{{item.traffic}}</p>
           <p class="dark:text-primary-dark-3 text-gray-800 !text-0.8">Used Volume: {{item.usedVolume}}</p>
         </div>
       </td>
       <td class="td-shadow">
         <div class="p-1">
           <p class="text-gray-800 dark:text-primary-dark-3 text-center">
             {{item.userLimitation}}
           </p>
         </div>
       </td>
       <td class="td-shadow">
         <div class="p-1">
           <p class="text-gray-800 text-center dark:text-primary-dark-3" v-if="item.contactInfo">{{item.contactInfo}}</p>
         </div>
       </td>
       <td class="td-shadow">
         <div class="p-1">
           <p class="text-gray-800 dark:text-primary-dark-3 text-0.8 mb-0.5">Registered: <template v-if="item.date.registered">{{item.date.registered}}</template></p>
           <p class="text-gray-800 dark:text-primary-dark-3 text-0.8 ">Expired: <template v-if="item.date.expired"> {{item.date.expired}}</template></p>
         </div>
       </td>
       <td class="td-shadow">
         <div class="p-1">
            <p class="category-card " :class="item.active ? 'bg-green-200 text-green-700':'bg-red-200 text-red-700'">
              <Icon name="ri:checkbox-blank-circle-fill"/>
              {{item.active ? 'active':'inactive'}}
            </p>
         </div>
       </td>
       <td class="td-shadow">
         <div class="p-1 text-center">
           <button class="btn btn-primary !p-0.5 mr-0.5">
             <Icon name="ri:settings-4-fill" size="1.8rem"  />
           </button>
           <button class="btn btn-teal !p-0.5">
             <Icon name="ri:links-fill" size="1.8rem"  />
           </button>
         </div>
       </td>
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
const props=defineProps<{
  titles:string[],
  rows:object[],
  searchResultFlag:boolean
}>()


</script>

<style scoped>

</style>