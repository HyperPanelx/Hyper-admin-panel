<template>
  <AppLink active-class="active"  :href="link" class="sidebar-item-link sidebar-item-link-collapse">
    <Icon  size="1.5rem" :name="icon" />
    <div class="group-hover:opacity-100  group-hover:visible transition-all duration-[100ms]">
      <span >
              {{title}}
      </span>
      <ul v-if="hasSub">
       <li v-for="row2 in sub" >
         <AppLink exact-active-class="active" :href="row2.link" class="sidebar-item-link p-1 [&_p]:hover:!text-primary-light-2">
           <p class="!text-primary-dark-2 !text-[0.85rem]" :class="{'!text-primary-light-1':$route.name.includes(row2.link.name)}">{{row2.title}}</p>
         </AppLink>
       </li>
      </ul>
    </div>
  </AppLink>

</template>

<script setup lang="ts">
const props=defineProps<{
  icon:string
  title:string
  link:string|object,
  hasSub:boolean,
  sub:object[]
}>();
</script>

<style scoped>

</style>