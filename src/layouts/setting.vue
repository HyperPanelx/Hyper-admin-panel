<template>
  <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Settings',link:'SETTINGS'},{name:$route.path.slice(10).split('-').join(' ')}]" />
  <section id="settings">
    <aside >
      <VCard title="options" body-class="p-1.5">
        <ul class="flex flex-col gap-1.3">
          <li v-for="item in settingTabItems">
            <NuxtLink exact-active-class="active" :to="item.link" class="tab-item" >
              <Icon size="1.3rem" class="dark:text-primary-dark-3" name="fluent-mdl2:increase-indent-arrow"/>
              <p class="text-gray-800 dark:text-primary-light-1">{{item.title}}</p>
            </NuxtLink>
          </li>
        </ul>
      </VCard>

    </aside>
    <div >
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
import {settingTabItems} from "~/utils/Data";
</script>

<style >
@tailwind components;
@layer components {
  .tab-item{
    @apply flex items-center [&_p]:transition-all hover:[&_p]:ml-0.7 hover:[&_*]:text-blue-700 dark:hover:[&_*]:text-blue-500
  }
  .tab-item.active{
    @apply [&_*]:text-blue-700 [&_p]:ml-0.7 dark:[&_*]:text-blue-400
  }
  #settings{
    @apply grid grid-cols-[1fr_3fr] gap-1.5 mt-3
  }
}
</style>