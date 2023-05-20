<template>
  <main id="content-wrapper">
    <LayoutSidebar />
    <section id="main-content">
      <LayoutNavbar />
      <slot />
    </section>
  </main>
</template>

<script>
export default {
  name: "default"
}
</script>

<style scoped lang="css">


</style>