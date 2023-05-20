<template>
  <nav>
    <Icon @click="collapseSidebar" size="2rem" class="cursor-pointer" name="fluent-mdl2:align-justify" color="black" />
    navbar
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