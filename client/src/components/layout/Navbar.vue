<template>
  <nav class="navbar">
    <div class="navbar-left">
      <font-awesome-icon @click="collapseSidebar" size="2rem" class="cursor-pointer mr-2 dark:!text-primary-dark-2 w-2" icon="fa-solid fa-bars" color="black" />
      <NavbarSearchDesktop v-model="openNavbarDropdownFlag"/>
    </div>
    <div class="navbar-right">
      <NavbarSearchMobile />
      <NavbarNotification/>
      <NavbarTheme />
      <font-awesome-icon @click="requestFullScreen"
            :icon="fullScreenFlag ? 'fa-solid fa-compress' : 'fa-solid fa-expand'" class="navbar-icon  md:!block !hidden w-1.6"
            size="1.6rem"
      />
    </div>
    <NavbarUser />
  </nav>
</template>

<script setup lang="ts">
import {ref,onMounted} from "vue";
import  NavbarSearchDesktop from '../Navbar/Search/Desktop.vue'
import  NavbarSearchMobile from '../Navbar/Search/Mobile.vue'
import NavbarNotification from '../Navbar/Notification.vue'
import NavbarTheme from '../Navbar/Theme.vue'
import NavbarUser from '../Navbar/User.vue'
import {useDashboardStore} from "../../composables/useStates";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const {windowWidth,dashboardStore,openNavbarDropdownFlag}=useDashboardStore();
const fullScreenFlag=ref<boolean>(false)


const collapseSidebar = () => {
  dashboardStore.sidebarCollapseFlag=!dashboardStore.sidebarCollapseFlag
}
const requestFullScreen = () => {
  if(document.documentElement.requestFullscreen){
    fullScreenFlag.value=!fullScreenFlag.value
    if(fullScreenFlag.value){
      document.documentElement.requestFullscreen()
    }else{
      document.exitFullscreen()
    }
  }
}

onMounted(()=>{
  if(windowWidth && windowWidth>500 && windowWidth<960){
    dashboardStore.sidebarCollapseFlag=true
  }
})

</script>

<style scoped>

</style>