<template>
  <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Settings',link:'SETTINGS'},{name:$route.path.slice(10).split('-').join(' ')}]" />
  <section id="settings">
    <aside >
      <VCard title="options" body-class="p-1.5">
        <ul class="flex flex-col gap-1.3">
          <li v-for="item in settingTabItems">
            <router-link exact-active-class="active" :to="item.link" class="tab-item" >
              <font-awesome-icon class="dark:text-primary-dark-3 text-0.6"  icon="fa-solid fa-arrow-right" />
              <p class="text-gray-800 dark:text-primary-light-1 ml-0.7">{{item.title}}</p>
            </router-link>
          </li>
        </ul>
      </VCard>

    </aside>
    <VCard :title="$route.path.slice(10).split('-').join(' ')" body-class="!p-2">
      <slot />
    </VCard>
  </section>
</template>

<script lang="ts" setup>
import VBreadcrumb from '../components/global/VBreadcrumb.vue'
import VCard from '../components/global/VCard.vue'
import {settingTabItems} from "../utils/Data";
</script>

<style >
@tailwind components;
@layer components {
  .tab-item{
    @apply flex items-center [&_p]:transition-all hover:[&_p]:ml-1.5 hover:[&_*]:text-blue-700 dark:hover:[&_*]:text-blue-500
  }
  .tab-item.active{
    @apply [&_*]:text-blue-700 [&_p]:ml-1.5 dark:[&_*]:text-blue-400
  }
  #settings{
    @apply grid grid-cols-[1fr_3fr] gap-1.5 mt-3 items-start
  }
}
</style>