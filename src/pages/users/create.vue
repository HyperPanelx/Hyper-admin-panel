<template>
  <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Users',link:'USERS'},{name:'Create User'}]" />
  <row class="mt-3">
    <column col="12">
      <VCard  body-class="!p-2">
        <template v-slot:title>
          create new user on <span class="text-secondary-light-2">{{getServerIP}}</span> server <router-link class="text-secondary-light-2 !text-[0.65rem] hover:underline" to='/servers'>Switch</router-link>
        </template>
        <template v-slot:body>
          <FormKit id="createSingleUserForm" type="form" name="createSingleUserForm" ref="createSingleUserForm"  @submit="createUserFormSubmit"  :actions="false" >
            <row  class="mt-0.5">
              <column col="12" md="4">
                <FormKit
                    type="custom_text"
                    label="username (required)"
                    id="username"
                    name="username"
                    validation-label="username"
                    validation="required"
                />

              </column>
              <column col="12" md="4">
                <FormKit
                    type="custom_text"
                    label="email"
                    id="email"
                    name="email"
                    help="example: user@gmail.com"
                    validation-label="email"
                    validation="email"
                />
              </column>
              <column col="12" md="4">
                <FormKit
                    type="custom_text"
                    label="phone (required)"
                    id="phone"
                    name="phone"
                    help="example: 09xxxxxxxxx"
                    validation-label="phone Number"
                    validation="required|matches:/^09\d{9}$/"
                />
              </column>
            </row>
            <row class="mt-2 mb-1">
              <column col="12" md="4">
                <FormKit
                    type="custom_number"
                    label="Multi user (required)"
                    id="concurrent_user"
                    :plugins="[castNumber]"
                    name="concurrent_user"
                    validation-label="Multi user"
                    validation="min:1"
                    min="1"
                />
              </column>
              <column col="12" md="4">
                <FormKit
                    type="custom_date"
                    label="Expiration date"
                    id="expiration_date"
                    name="expiration_date"
                    validation-label="Expiration Date"
                    :validation="`required|date_after:${currentYear}-${currentMonth}-${currentDate}`"
                />
              </column>
              <column col="12" md="4">
                <FormKit
                    type="custom_text"
                    label="traffic"
                    id="traffic"
                    name="traffic"
                    validation="number"
                />
                <FormKit
                    type="custom_radio"
                    :options="['Gigabyte', 'Megabyte']"
                    label="traffic_unit"
                    id="traffic_unit"
                    name="traffic_unit"
                    value="Gigabyte"
                />

              </column>
            </row>
            <row >
              <column col="12" md="4">
                <FormKit
                    type="custom_text"
                    label="Referral"
                    id="referral"
                    name="referral"
                />
              </column>
              <column col="12" md="4">
                <FormKit
                    type="custom_text"
                    label="Telegram id (required)"
                    id="telegram_id"
                    name="telegram_id"
                    validation-label="Telegram id"
                    validation="required"
                />

              </column>
              <column col="12" md="4">
                <FormKit
                    rows="3"
                    type="custom_area"
                    label="Description"
                    id="description"
                    name="description"
                />
              </column>
            </row>
          </FormKit>
          <div class="flex gap-2 items-center mt-2">
            <VBloader class="btn btn-indigo btn-md"
                      animation="slide-down"
                      :duration="2000"
                      @click="submitForm"
                      :loading="fetchOperationData.on"
            >
              Submit
            </VBloader>
            <p class="text-red-700 dark:text-primary-light-1 " v-if="fetchOperationData.error">{{fetchOperationData.msg}}</p>
          </div>
        </template>
      </VCard>
    </column>
  </row>
  <VModal :fade-outside="false" class="!p-0 !h-auto" v-model="fetchOperationData.modal">
    <div class="modal-body">
      <p class="text-1 text-green-600 dark:text-green-400 flex items-center gap-0.5"> <Icon name="fluent-mdl2:accept"/>  User created successfully!</p>
      <row class="mt-1.5 justify-center">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">username:</p>
        </column>
        <column col="6">
          <p class="font-second dark:text-primary-light-1">{{newCreatedUserData.username}}</p>
        </column>
      </row>
      <row class="mt-0.5">
        <column col="6">
          <p class="font-second text-right dark:text-primary-light-1">password:</p>
        </column>
        <column col="6">
          <div  class="flex gap-1 items-center">
            <input class="font-second w-6 leading-1 dark:bg-[#37404a] dark:text-primary-light-1" :type="showPasswordFlag ? 'text' : 'password'" disabled :value="newCreatedUserData.password" />
            <font-awesome-icon @click="showPasswordFlag=!showPasswordFlag" class="text-gray-800 dark:text-primary-light-1 cursor-pointer text-1" size="1.3rem" :icon="showPasswordFlag ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye' "/>
          </div>
        </column>
      </row>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary btn-sm" @click="copyText(`username:${newCreatedUserData.username} password:${newCreatedUserData.password}`)">
        copy
      </button>
      <button class="btn btn-indigo btn-sm" @click="closeModal">
        close
      </button>
    </div>
  </VModal>
</template>

<script setup lang="ts">
import {copyText} from "../../utils/Helper";
import VBreadcrumb from '../../components/global/VBreadcrumb.vue'
import VCard from '../../components/global/VCard.vue'
import VBloader from '../../components/global/VBloader.vue'
import VModal from '../../components/global/VModal.vue'
import {useServerStore} from "../../composables/useStates";
import {currentYear,currentDate,currentMonth} from "../../utils/Helper";
import {ref} from 'vue'
import {useCreateUser} from "../../composables/users/useCreate";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const {createUserFormSubmit,fetchOperationData,createSingleUserForm,submitForm,castNumber,closeModal,newCreatedUserData}=useCreateUser();
const showPasswordFlag=ref<boolean>(false);
const {getServerIP}=useServerStore()

</script>

<style scoped>

</style>