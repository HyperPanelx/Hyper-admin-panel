<template>
  <teleport to="body" >
    <div class="fab-wrapper">
      <p class="fab-button"> <font-awesome-icon :icon="fabIcon"/> </p>
      <ul class="fab-item-list-up">
        <template v-for="item in items.slice(0,3)">
          <li v-if="item.status" class="fab-item" >
          <span class="fab-item-tooltip">
            {{item.title}}
          </span>
            <router-link :to="{query:{page:'setting',section:item.query}}">
              <font-awesome-icon :icon="item.icon"/>
            </router-link>
          </li>
        </template>

      </ul>
      <ul class="fab-item-list-middle">
        <template v-for="item in items.slice(6,9)">
          <li v-if="item.status" class="fab-item " >
          <span class="fab-item-tooltip !rotate-[180deg]">
            {{item.title}}
          </span>
            <router-link class="!z-auto" :to="{query:{page:'setting',section:item.query}}">
              <font-awesome-icon class="rotate-[-130deg]" :icon="item.icon"/>
            </router-link>
          </li>
        </template>

      </ul>
      <ul class="fab-item-list-left">
        <template v-for="item in items.slice(3,6)">
          <li v-if="item.status" class="fab-item" >
          <span class="fab-item-tooltip">
            {{item.title}}
          </span>
            <router-link :to="{query:{page:'setting',section:item.query}}">
              <font-awesome-icon :icon="item.icon"/>
            </router-link>
          </li>
        </template>

      </ul>
    </div>
  </teleport>
</template>

<script setup lang="ts">



const props=defineProps<{
  fabIcon:string
  items:{
    title:string
    icon:string
    query:string
    status:boolean
  }[]
}>()


</script>

<style scoped>
.fab-wrapper .fab-item-list-left{
  writing-mode: sideways-rl;
}
.fab-wrapper .fab-item-list-left .fab-item span,.fab-wrapper .fab-item-list-middle .fab-item span{
  writing-mode: initial !important;
  bottom: -48px !important;
  width: 138px !important;
  left:-42px !important;
}
.fab-wrapper .fab-item-list-middle .fab-item span{
  transition: none !important;
}

</style>