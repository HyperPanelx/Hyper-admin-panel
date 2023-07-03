<template>

  <VTooltip class="relative z-10" content="Download user detail" inner-class="!w-10 !right-[-18px] !bg-primary-dark-1/70">
    <button @click="downloadUserDetail" class="btn-operation btn-teal ">
      <font-awesome-icon class="text-1.3 text-primary-light-1" icon="fa-solid fa-download" />
      <a ref="downloadAnchorElem" style="display:none"></a>
    </button>
  </VTooltip>
</template>

<script setup lang="ts">
import VTooltip from '../global/VTooltip.vue'
import {useDownload} from "../../composables/users/useDownload";
const props=defineProps(['user','traffic','usedVolume','multi','phone','email','registered','exdate','status','uid','passwd','telegram_id','desc','referral','server']);
const {downloadUserDetail,downloadAnchorElem}=useDownload(props)
</script>

<style scoped>
@tailwind components;
@layer components {
  .btn-operation{
    @apply  w-[2.8rem] h-[2.8rem] !flex !justify-center !items-center transition-all
  }
}
</style>