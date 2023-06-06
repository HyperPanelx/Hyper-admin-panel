<template>
  <AppLink :class="$route.path.toLowerCase().includes(link.name.toLowerCase()) ? 'active' : null"  :href="link" class="sidebar-item-link sidebar-item-link-collapse">
    <font-awesome-icon  size="1.5rem" class="w-1.5" :icon="icon" />
    <div class="group-hover:opacity-100  group-hover:visible transition-all duration-[100ms]">
      <span >
              {{title}}
      </span>
      <ul v-if="hasSub">
       <li v-for="row2 in sub" >
         <AppLink exact-active-class="active"  :href="row2.link" class="sidebar-item-link p-1 [&_p]:hover:!text-primary-light-2">
           <p class="!text-primary-dark-2 !text-[0.85rem]" :class="{'!text-primary-light-1':$route.name.toLowerCase().includes(row2.link.name.toLowerCase())}">{{row2.title}}</p>
         </AppLink>
       </li>
      </ul>
    </div>
  </AppLink>

</template>

<script setup lang="ts">
import AppLink from '../global/AppLink.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const props=defineProps<{
  icon:string
  title:string
  link:string|object,
  hasSub:boolean,
  sub?:object[]
}>();
</script>

<style scoped>

</style>