<template>
  <div
      v-if="hasSub"
      @click="openSubMenuFlag=!openSubMenuFlag"
      class="sidebar-item-link cursor-pointer "
      :class="{'active':$route.path.toLowerCase().includes(link.name.toLowerCase())}"
  >
    <font-awesome-icon  class="text-primary-dark-2 "  :icon="icon" />
    <p v-if="windowWidth>500 ? !sidebarCollapseFlag : true" class="text-primary-dark-2">{{title}}</p>
    <font-awesome-icon size="1.5rem" :class="{'rotate-[90deg]':openSubMenuFlag}" class="ml-auto text-primary-dark-2 transition-all  text-0.7" icon="fa-solid fa-chevron-right"/>
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
    <li v-for="row2 in sub" class="pb-1.2 first:pt-1 last:!pb-0 !mb-0">
      <AppLink class="sidebar-item-link pl-3 " exact-active-class="active" :href="row2.link">
        <p  class="text-primary-dark-2 !text-[0.85rem]">{{row2.title}}</p>
      </AppLink>
    </li>
  </ul>

</template>

<script setup lang="ts">
import {ref,watch} from "vue";
import {useRoute} from "vue-router";
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
const route=useRoute()
const {sidebarCollapseFlag,windowWidth}=useDashboardStore()
const openSubMenuFlag=ref<boolean>(false)
watch(
    ()=>route.path,
    ()=>{
      openSubMenuFlag.value=false
    }
)

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