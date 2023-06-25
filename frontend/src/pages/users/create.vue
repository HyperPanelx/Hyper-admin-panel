<template>
  <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Users',link:'USERS'},{name:'Create User'}]" />
  <row class="mt-3">
    <column col="12">
      <VCard title="create new user" body-class="!p-2">
        <FormKit id="createSingleUserForm" type="form" ref="createSingleUserForm"  @submit="createUserFormSubmit"  :actions="false" >
          <row>
            <column col="12" md="6">
              <FormKit
                  v-focus
                  validation-label="username"
                  validation="required"
                  type="text"
                  id="username"
                  name="username"
                  input-class=" font-main"
                  label="Username (required)"
                  label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                  :floating-label="true"
              />
            </column>
            <column col="12" md="6">
              <FormKit
                  validation="email"
                  type="text"
                  id="email"
                  name="email"
                  input-class=" font-main"
                  label="Email Address (like: abc@gmail.com)"
                  label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main md:!text-1 !text-0.8"
                  :floating-label="true"
              />

            </column>
          </row>
          <row class="my-1">
            <column col="12" md="6">
              <FormKit
                  validation="required|matches:/^09\d{9}$/"
                  validation-label="Phone Number"
                  type="text"
                  id="phone"
                  name="phone"
                  input-class=" font-main"
                  label="Phone Number (Required) (like: 09xxxxxxxxx)"
                  label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main md:!text-1 !text-0.8"
                  :floating-label="true"
              />
            </column>
            <column col="12" md="6">
              <FormKit
                  validation="min:1"
                  validation-label="Concurrent user"
                  type="number"
                  :plugins="[castNumber]"
                  id="concurrent_user"
                  name="concurrent_user"
                  input-class=" font-main"
                  label="Concurrent user (Required)"
                  label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                  value="1"
                  :floating-label="true"
                  min="1"
              />

            </column>
          </row>
          <row>
            <column col="12" md="6">
              <FormKit
                  :validation="`required|date_after:${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`"
                  validation-label="Expiration Date"
                  type="date"
                  id="expiration_date"
                  name="expiration_date"
                  input-class=" font-main"
                  label="Expiration Date (Required)"
                  label-class="dark:text-primary-dark-2 !translate-x-[-1px] !text-0.7 !translate-y-[2px] bg-primary-light-1 dark:!bg-[#37404a] !font-main"
                  :floating-label="true"
              />
            </column>
            <column col="12" md="6">
              <FormKit
                  type="text"
                  id="traffic"
                  name="traffic"
                  input-class=" font-main"
                  label="Traffic"
                  label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                  :floating-label="true"
              />
              <FormKit
                  name="traffic_unit"
                  id="traffic_unit"
                  fieldset-class="!border-[0px] dark:[&_*]!text-primary-light-1 !pl-0 !ml-0"
                  options-class="!flex gap-1 !flex-row"
                  type="radio"
                  :options="['Gigabyte', 'Megabyte']"
                  value="Gigabyte"
                  label-class="dark:!text-primary-light-1"
              />

            </column>
          </row>
          <row  class="my-1">
            <column col="12" md="6">
              <FormKit
                  type="text"
                  id="referral"
                  name="referral"
                  input-class=" font-main"
                  label="Referral"
                  label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"

                  :floating-label="true"
              />
            </column>
            <column col="12" md="6">
              <FormKit
                  validation-label="Telegram id"
                  validation="required"
                  type="text"
                  id="telegram_id"
                  name="telegram_id"
                  input-class="font-main"
                  label="Telegram id (required)"
                  label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                  :floating-label="true"
              />

            </column>
          </row>
          <row >
            <column col="12" md="6">
              <FormKit
                  rows="5"
                  type="textarea"
                  id="description"
                  name="description"
                  input-class=" font-main"
                  label="Description"
                  label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                  :floating-label="true"
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
      <button class="btn btn-secondary btn-sm" @click="copyCreatedUserInfo">
        copy
      </button>
      <button class="btn btn-indigo btn-sm" @click="closeModal">
        close
      </button>
    </div>
  </VModal>
</template>

<script setup lang="ts">
import VBreadcrumb from '../../components/global/VBreadcrumb.vue'
import VCard from '../../components/global/VCard.vue'
import VBloader from '../../components/global/VBloader.vue'
import VModal from '../../components/global/VModal.vue'
import {ref} from 'vue'
import {useCreateUser} from "../../composables/users/useCreate";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const {createUserFormSubmit,fetchOperationData,createSingleUserForm,submitForm,castNumber,closeModal,newCreatedUserData,copyCreatedUserInfo}=useCreateUser();
const showPasswordFlag=ref<boolean>(false);
const date=new Date()


</script>

<style scoped>

</style>