<template>
  <Icon @click="toggleTheme" :name="themeFlag ? 'solar:sun-2-bold' : 'solar:moon-bold'" size="1.6rem" class=" navbar-icon"></Icon>

</template>

<script setup lang="ts">
const themeFlag=ref( false)

const toggleTheme = () => {
  themeFlag.value=!themeFlag.value
  document.body.classList.toggle('dark')
  localStorage.setItem('x_hyper_theme_x',JSON.stringify(themeFlag.value))
}

onMounted(()=>{
  const storedData=localStorage.getItem('x_hyper_theme_x')
  if(storedData){
    themeFlag.value=JSON.parse(storedData)
    themeFlag.value ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }else{
    themeFlag.value=false
  }

})

</script>

<style scoped>

</style>