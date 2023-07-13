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
                <row class="justify-center md:pl-4">
                  <column md="8" col="12">
                    <VTInput type="text"
                             placeholder="Enter username"
                             label="Username"
                             v-model="userData.username"
                             :regex="usernameRegex"
                    />
                  </column>
                </row>
                <row class="justify-center md:pl-4">
                  <column md="8" col="12">
                    <VTInput type="password"
                             tooltipClass="!top-[-5px]"
                             placeholder="Enter password"
                             label="Password"
                             v-model="userData.password"
                             :regex="passwordRegex"
                    />
                  </column>
                </row>
                <row  class="justify-center md:pl-4">
                  <column md="8" col="12" class="flex justify-between items-center">
                    <VCheckbox v-model="userData.rememberMe" label="Remember me" />
                  </column>
                </row>
                <row class="justify-center md:pl-4 mt-1">
                  <column md="8" >
                    <VBloader class="btn btn-primary btn-md"
                              animation="slide-down"
                              :duration="2000"
                              :loading="loginRequestFlag"

                    >
                      Login
                    </VBloader>

                    <p v-if="errorMessage" class="text-red-600 mt-1">
                      {{errorMessage}}
                    </p>
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
import VTInput from '../components/global/VTInput.vue'
import VCheckbox from '../components/global/VCheckbox.vue'
import VBloader from '../components/global/VBloader.vue'
import {useLogin} from "../composables/useLogin";
const {userData,formHandler,usernameRegex,passwordRegex,loginRequestFlag,errorMessage}=useLogin();
document.body.classList.remove('dark')
</script>

<style lang="scss" scoped>
@tailwind components;
@layer components {
  body{
    @apply !bg-primary-light-1;
  }
}
</style>