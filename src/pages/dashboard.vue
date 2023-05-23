<template>
dashboard page
  {{userInformation}}
  <button @click="logoutHandler">
    logout
  </button>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut, consectetur cupiditate fuga fugit molestiae officia perspiciatis provident sed temporibus tenetur unde vel, velit! Aperiam consequatur distinctio eligendi ex iusto modi nihil qui! Aliquid consequuntur deleniti eveniet excepturi, fugiat perferendis ullam. Consectetur itaque modi, molestiae natus quas voluptatum? Aliquam aliquid, deserunt distinctio dolor hic illum in laboriosam laborum magni maxime natus necessitatibus odio optio quia quo repudiandae sed temporibus veritatis, vero voluptatum? Autem blanditiis commodi deleniti dicta dolorem doloribus, eos modi mollitia officiis perspiciatis, praesentium rem sed sit temporibus, velit vero voluptas. Ab animi aspernatur assumenda cumque dicta dignissimos, dolorem dolores esse et ipsa iure labore magnam maxime necessitatibus nesciunt numquam obcaecati praesentium quasi qui quibusdam reprehenderit sint tempora tenetur ut vero? Cupiditate doloribus error laboriosam quasi qui. Eaque earum impedit ipsa odit placeat quod rem saepe sed, sequi sint tempora veniam! Adipisci aliquam amet animi aspernatur at culpa debitis ea eligendi esse explicabo facilis fugit iste iusto, laborum minima numquam officia perspiciatis quaerat quam, quibusdam repellat saepe sint unde veniam voluptas. Aliquid amet at autem corporis cumque ea facere fugiat ipsam ipsum modi nihil non nostrum odio officiis optio, perferendis possimus quas quibusdam reiciendis repudiandae rerum soluta, vero voluptatem.</p>
  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
</template>

<script setup lang="ts">
definePageMeta({
  name:'DASHBOARD'
})
const {userInformation}=useStates()
const {logoutHandler}=useLogout()
</script>

<style scoped>

</style>