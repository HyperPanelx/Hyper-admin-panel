<template>
  <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Users',link:'USERS'},{name:'Edit User'}]" />

  <row v-if="fetchFlag" class="mt-2">
    <column col="12">
      <VCard  body-class="!p-2">
        <template v-slot:title>
          edit user on <span class="text-secondary-light-2">{{getServerIP}}</span> server <router-link class="text-secondary-light-2 !text-[0.65rem] hover:underline" to='/servers'>Switch</router-link>
        </template>
        <template v-slot:body>
          <FormKit id="editUserForm" type="form" ref="editUserForm"  @submit="editUserFormSubmit"  :actions="false" >
            <row class="my-1">
              <column col="12" md="4">
                <FormKit
                    validation="required"
                    :value="userInitialData.username"
                    type="custom_text"
                    id="e_username"
                    name="e_username"
                    label="username"
                />
              </column>
              <column col="12" md="4">
                <FormKit
                    :value="userInitialData.telegram_id"
                    type="custom_text"
                    id="e_telegram_id"
                    name="e_telegram_id"
                    label="telegram id"
                />
              </column>
              <column col="12" md="4">
                <FormKit
                    :value="userInitialData.phone"
                    validation="matches:/^0?9\d{9}$/"
                    type="custom_text"
                    id="e_phone"
                    name="e_phone"
                    label="phone"
                    help="example: 09xxxxxxxxx"
                />
              </column>
            </row>
            <row>

              <column col="12" md="4">
                <FormKit
                    :value="userInitialData.email"
                    validation="email"
                    type="custom_text"
                    id="e_email"
                    name="e_email"
                    label="email"
                    help="example: user@gmail.com"
                />
              </column>
              <column col="12" md="4">
                <FormKit
                    :value="userInitialData.traffic.num"
                    type="custom_text"
                    id="e_traffic"
                    name="e_traffic"
                    label="traffic"
                    validation="number"
                />
                <FormKit
                    type="custom_radio"
                    :options="['Gigabyte', 'Megabyte']"
                    label="e_traffic_unit"
                    id="e_traffic_unit"
                    name="e_traffic_unit"
                    :value="userInitialData?.traffic?.unit || 'Gigabyte'"
                />
              </column>
            </row>

          </FormKit>
          <div class="mt-1.5">
            <VBloader class="btn btn-indigo btn-md"
                      animation="slide-down"
                      :duration="2000"
                      @click="submitForm"
                      :loading="editFetchFlag"
            >
              Submit
            </VBloader>
          </div>
        </template>
      </VCard>
    </column>
  </row>
</template>

<script setup lang="ts">
import VBloader from '../../components/global/VBloader.vue'
import VBreadcrumb from '../../components/global/VBreadcrumb.vue'
import VCard from '../../components/global/VCard.vue'
import {useEdit} from "../../composables/users/useEdit";
import {useServerStore} from "../../composables/useStates";
const {fetchFlag,userInitialData,editUserForm,editUserFormSubmit,submitForm,editFetchFlag}=useEdit()
const {getServerIP}=useServerStore()

</script>

<style scoped>

</style>