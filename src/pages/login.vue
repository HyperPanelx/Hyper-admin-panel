<template>
  <section id="login">
    <container-full>
      <row class="justify-center md:px-0 px-1">
        <column md="6" col="12">
            <div class="login-form-wrapper">
              <div class="login-form-header">
                 <div class="login-img"></div>
                  <div class="login-header-content">
                      <h2 class="text-center uppercase text-primary-light-1 font-700">Login</h2>
                  </div>
               </div>
              <div class="login-form-content">
                <form @submit.prevent="formHandler">
                  <row class="justify-center pl-4">
                    <column md="8" col="12">
                      <VTInput type="text"
                              placeholder="Enter username"
                              label="Username"
                              v-model="userData.username"
                              :regex="usernameRegex"
                              rule="1- username is 8-20 characters long<br/>2- no _ or . at the beginning<br/>3- no __ or _. or ._ or .. inside<br/>4- no _ or . at the end"
                      />
                    </column>
                  </row>
                  <row class="justify-center pl-4">
                    <column md="8" col="12">
                      <VTInput type="password"
                              placeholder="Enter password"
                              label="Password"
                              v-model="userData.password"
                              :regex="passwordRegex"
                              rule="Minimum eight characters, at least one letter, one number and one special character"
                      />
                    </column>
                  </row>
                  <row  class="justify-center pl-4">
                    <column md="8" col="12" class="flex justify-between items-center">
                      <VCheckbox v-model="userData.rememberMe" label="Remember me" />
                    </column>
                  </row>
                  <row class="justify-center pl-4 mt-2">
                    <column md="8">
                      <VBloader class="btn btn-primary btn-md"
                                animation="slide-down"
                                :duration="2000"
                                :loading="loginRequestFlag"

                      >
                        Login
                      </VBloader>
                    </column>
                  </row>
                </form>
              </div>
            </div>
        </column>
      </row>
    </container-full>
  </section>
</template>

<script setup lang="ts">
definePageMeta({layout:false,name:'LOGIN'})
useHead({
  bodyAttrs:{
    style:'background-color:#ebeeef'
  }
});
const {userData,formHandler,usernameRegex,passwordRegex,loginRequestFlag}=useLogin()
</script>

<style scoped>

</style>