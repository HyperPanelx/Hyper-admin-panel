<template>
  <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Users',link:'USERS'},{name:'Generate New Users'}]" />
  <row class="mt-3">
    <column col="12">
      <VCard  body-class="!p-2">
        <template v-slot:title>
          Generate new users on <span class="text-secondary-light-2">{{getServerIP}}</span> server <router-link class="text-secondary-light-2 !text-[0.65rem] hover:underline" to='/servers'>Switch</router-link>
        </template>
        <template v-slot:body>
          <FormKit id="generateUserForm" type="form" ref="generateUserForm"  @submit="generateUserFormSubmit"  :actions="false" >
            <row>
              <column md="3" class="md:mb-0 mb-1" col="12">
                <FormKit
                    type="custom_number"
                    label="Multi user"
                    id="g_concurrent_user"
                    :plugins="[castNumber]"
                    name="g_concurrent_user"
                    validation-label="Multi user"
                    validation="min:1"
                    min="1"
                />
              </column>
              <column md="3" class="md:mb-0 mb-1" col="12">
                <FormKit
                    type="custom_number"
                    label="Count"
                    id="g_count"
                    :plugins="[castNumber]"
                    name="g_count"
                    validation-label="user"
                    validation="min:1"
                    min="1"
                />

              </column>
              <column md="4" class="md:mb-0 mb-1" col="12">
                <FormKit
                    type="custom_date"
                    label="Expiration date"
                    id="g_expiration_date"
                    name="g_expiration_date"
                    validation-label="Expiration Date"
                    :validation="`required|date_after:${currentYear}-${currentMonth}-${currentDate}`"
                />
              </column>
            </row>
          </FormKit>
          <div class="mt-2 flex items-center gap-1.5">
            <VBloader class="btn btn-indigo btn-md"
                      animation="slide-down"
                      :duration="2000"
                      @click="submitForm"
                      :loading="generateUsersData.on"
            >
              Generate
            </VBloader>
            <button @click="downloadGeneratedDataHandler" class="btn btn-indigo btn-md" v-if="generateUsersData.isDownloadAvailable">
              Download file
            </button>
            <p v-if="generateUsersData.msgFlag" class="text-red-700 dark:text-primary-light-1 ">
              {{generateUsersData.msg}}
            </p>
            <a style="display: none" ref="downloadAnchorElem"></a>
          </div>
        </template>
      </VCard>
    </column>
  </row>

  <VModal :fade-outside="true" class="!p-0 !h-auto" v-model="generateUsersData.modalFlag">
    <div :class="{'!h-auto':generateUsersData.data.length===1}" class="modal-body h-13 overflow-y-auto">
      <p  class="text-1 text-gray-800 dark:text-primary-dark-3 flex items-center gap-0.5"> Users Generated!</p>
      <template v-for="(item,index) in generateUsersData.data">
        <row  class="mt-0.5 justify-center">
          <column col="6">
            <p class="font-second text-right dark:text-primary-light-1">Username: </p>
          </column>
          <column col="6">
            <p @click="copyText(item.user)" class="font-second dark:text-primary-light-1">{{item.user}}</p>
          </column>
        </row>
        <row  class="mt-0.5 justify-center">
          <column col="6">
            <p class="font-second text-right dark:text-primary-light-1">Password: </p>
          </column>
          <column col="6">
            <p @click="copyText(item.passwd)" class="font-second dark:text-primary-light-1">{{item.passwd}}</p>
          </column>
        </row>
        <div v-if="index!==generateUsersData.data.length-1" class="w-full h-[1px] my-0.5 bg-gray-200"></div>
      </template>
    </div>
    <div class="modal-footer">
      <button class="btn btn-indigo btn-sm" @click="generateUsersData.modalFlag=false">
        Close
      </button>
    </div>
  </VModal>

</template>

<script setup lang="ts">
import VBreadcrumb from '../../components/global/VBreadcrumb.vue'
import VModal from '../../components/global/VModal.vue'
import VCard from '../../components/global/VCard.vue'
import VBloader from '../../components/global/VBloader.vue'
import {useGenerate} from "../../composables/users/useGenerate";
import {useServerStore} from "../../composables/useStates";
import {copyText,currentYear,currentDate,currentMonth} from "../../utils/Helper";
const {castNumber,generateUserForm,submitForm,generateUserFormSubmit,generateUsersData,downloadGeneratedDataHandler,downloadAnchorElem}=useGenerate();
const {getServerIP}=useServerStore()
</script>

<style scoped>

</style>