<template>
  <nav class="navbar">
    <div class="navbar-left">
      <Icon @click="collapseSidebar" size="2rem" class="cursor-pointer mr-2 dark:!text-primary-dark-2" name="mdi-light:menu" color="black" />
      <NavbarSearchDesktop v-model="openNavbarDropdownFlag"/>
    </div>
    <div class="navbar-right">
      <NavbarSearchMobile />
      <NavbarNotification/>
      <NavbarTheme />
      <Icon @click="requestFullScreen"
            :name="fullScreenFlag ? 'solar:quit-full-screen-linear' : 'solar:full-screen-bold'" class="navbar-icon  md:!block !hidden"
            size="1.6rem"
      />
    </div>
    <NavbarUser />
  </nav>
</template>

<script setup lang="ts">
const sidebarCollapseFlag=useState('sidebarCollapseFlag',()=>false)
const windowWidth:null|number=process.client ? window.innerWidth : null
const fullScreenFlag=ref<boolean>(false)
const {openNavbarDropdownFlag}=useStates()

const collapseSidebar = () => {
  sidebarCollapseFlag.value=!sidebarCollapseFlag.value
}
const requestFullScreen = () => {
  if(process.client && document.documentElement.requestFullscreen){
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
    sidebarCollapseFlag.value=true
  }
})

</script>

<style scoped>

</style>