<template>
  <nav class="navbar">
    <div class="navbar-left">
      <Icon @click="collapseSidebar" size="2rem" class="cursor-pointer mr-2" name="mdi-light:menu" color="black" />
      <NavbarSearch />
    </div>
  </nav>
</template>

<script setup lang="ts">
const sidebarCollapseFlag=useState('sidebarCollapseFlag',()=>false)
const windowWidth:null|number=process.client ? window.innerWidth : null

const collapseSidebar = () => {
  sidebarCollapseFlag.value=!sidebarCollapseFlag.value
}
onMounted(()=>{
  if(windowWidth && windowWidth>500 && windowWidth<960){
    sidebarCollapseFlag.value=true
  }
})

</script>

<style scoped>

</style>