<template>
 <div class="table-responsive">
   <table class="w-full">
     <thead class="bg-primary-dark-1 dark:bg-primary-dark-2/50 text-primary-light-1 text-left font-500">
     <tr  class="w-full">
       <th class=" capitalize cursor-pointer  py-1.5 pr-0.5 first:pl-1 pl-0.5" v-for="item in titles">
        <div class="w-[4.2rem]">
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
     <tr class="table-hover td-border"  v-for="item in rows">
       <td >
         <div class="p-1 ">
           <p class="mb-0.5 text-gray-800 dark:text-primary-light-1 flex items-center gap-1">
             <Icon name="ri:account-circle-fill" size="1.2rem"/>
             {{item.username}}
           </p>
           <p class=" text-gray-800 dark:text-primary-light-1  flex items-center gap-1">
             <Icon name="ri:key-fill" size="1.2rem"/>
             {{item.password}}
           </p>
         </div>
       </td>
       <td  >
         <div class=" p-1">
           <p class="dark:text-primary-dark-3 text-gray-800 mb-0.5 !text-0.8">{{item.traffic}}</p>
           <p class="dark:text-primary-dark-3 text-gray-800 !text-0.8">Used Volume: {{item.usedVolume}}</p>
         </div>
       </td>
       <td >
         <div >
           <p class="text-gray-800 dark:text-primary-dark-3 text-center">
             {{item.userLimitation}}
           </p>
         </div>
       </td>
       <td >
         <div class="p-0.5">
           <p class="text-gray-800 !text-0.8 mb-0.5 text-center dark:text-primary-dark-3" v-if="item.contactInfo.phone">
             <Icon class="mr-0.2" name="bi:telephone-fill"  />
             {{item.contactInfo.phone}}
           </p>
           <p :title="item.contactInfo.email" class="text-gray-800 !text-0.8 w-[6.5rem] text-hidden text-center dark:text-primary-dark-3 mx-auto" v-if="item.contactInfo.email">
             <Icon class="mr-0.2" name="bi:envelope-fill"/>
             {{item.contactInfo.email}}
           </p>
         </div>
       </td>
       <td >
         <div class="p-1">
           <p class="text-gray-800 dark:text-primary-dark-3 text-0.8 mb-0.5">Registered: <template v-if="item.date.registered">{{item.date.registered}}</template></p>
           <p class="text-gray-800 dark:text-primary-dark-3 text-0.8 ">Expired: <template v-if="item.date.expired"> {{item.date.expired}}</template></p>
         </div>
       </td>
       <td >
         <div class="p-1">
            <p :title="item.status" class="category-card " :class="{ 'bg-green-200 text-green-700':item.status==='active','bg-red-200 text-red-700':item.status==='inactive','bg-blue-200 text-blue-700':item.status==='Traffic completion'}">
              <Icon size="0.6rem" name="ri:checkbox-blank-circle-fill"/>
              {{item.status}}
            </p>
         </div>
       </td>
       <td >
         <div class="p-1 text-center">
           <button @click="editUser(item.uid)" class="btn btn-sm btn-indigo !p-0.5 mr-0.5">
             <Icon name="ri:settings-4-fill" size="1.5rem"  />
           </button>
           <button @click="userSetting(item.uid)" class="btn btn-sm btn-rose mr-0.5 !p-0.5">
             <Icon name="bi:pencil-square" size="1.5rem"  />
           </button>
           <button @click="copyUserDetail(item.uid)" class="btn btn-sm btn-teal !p-0.5">
             <Icon name="ri:links-fill" size="1.5rem"  />
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
}>();
const {editUser,copyUserDetail,userSetting}=useUserOperation()

</script>

<style scoped>

</style>