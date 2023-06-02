<template>
  <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Settings'}]" />
  <row class="mt-2">
    <column col="12">
      <ul class="flex flex-row   ">
        <li v-for="item in settingTabItems" >
          <NuxtLink :to="item.link" exact-active-class="active"  class="tab-item ">
            {{item.title}}
          </NuxtLink>
        </li>
      </ul>
    </column>
  </row>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {settingTabItems} from "~/utils/Data";
</script>

<style >
@tailwind components;
@layer components {
  .tab-item{
    @apply border-b-[2px] border-b-gray-200 py-1 block text-[0.85rem]  px-1 transition-all hover:text-blue-900  text-blue-600 font-500 text-center;
  }
  .tab-item.active{
    @apply border-b-blue-700 !border-b-[4px] text-blue-900
  }
}
</style>