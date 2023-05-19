<template>
  <div v-bind="$attrs" class="row"><slot/></div>
</template>

<script>
export default {
  name: "row",
  props:['colGap','rowGap'],
  data(){
    return{
      columnGaps:this.colGap || 0,
      rowGaps:this.rowGap || 0,
    }
  }
}
</script>

<style lang="scss" scoped>
@tailwind components;
@layer components {
  .row{
    column-gap: v-bind(columnGaps);
    row-gap: v-bind(rowGaps);
    display: flex;
    flex-wrap: wrap;
  }
}

</style>