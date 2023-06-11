<template>
  <div
      v-if="hasSub"
      @click="openSubMenuFlag=!openSubMenuFlag"
      class="sidebar-item-link cursor-pointer "
      :class="{'active':$route.path.toLowerCase().includes(link.name.toLowerCase())}"
  >
    <font-awesome-icon  class="text-primary-dark-2 text-1.5"  :icon="icon" />
    <p v-if="windowWidth>500 ? !sidebarCollapseFlag : true" class="text-primary-dark-2">{{title}}</p>
    <font-awesome-icon size="1.5rem" :class="{'rotate-[90deg]':openSubMenuFlag}" class="ml-auto text-primary-dark-2 transition-all w-1.5" icon="fa-solid fa-chevron-right"/>
  </div>
  <AppLink  v-else
            @click="openSubMenuFlag=!openSubMenuFlag"
            :class="$route.path.toLowerCase().includes(link.name.toLowerCase())? 'active' : null"
            :href="link"
            class="sidebar-item-link"
  >
    <font-awesome-icon  class="text-primary-dark-2 w-1.5" size="1.5rem" :icon="icon" />
    <p v-if="windowWidth>500 ? !sidebarCollapseFlag : true" class="text-primary-dark-2">{{title}}</p>
  </AppLink>
  <ul v-if="hasSub" v-collapse="openSubMenuFlag" class="v-collapse">
    <li v-for="row2 in sub" class="pt-1.5 last:pb-0">
      <AppLink class="sidebar-item-link pl-3 " active-class="active" :href="row2.link">
        <p  class="text-primary-dark-2 !text-[0.85rem]">{{row2.title}}</p>
      </AppLink>
    </li>
  </ul>

</template>

<script setup lang="ts">
import {ref} from "vue";
import {useDashboardStore} from "../../composables/useStates";
import AppLink from '../global/AppLink.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const props=defineProps<{
  icon:string
  title:string
  link:string|object,
  hasSub:boolean,
  sub?:object[]
}>();
const {sidebarCollapseFlag,windowWidth}=useDashboardStore()
const openSubMenuFlag=ref<boolean>(false)


</script>

<style scoped lang="scss">
@tailwind components;
@layer components {
  .v-collapse:not(.show) {
    @apply hidden;
  }

  .v-collapsing {
    @apply h-0 overflow-hidden transition-all duration-300 ease-in-out;
  }
}
</style>