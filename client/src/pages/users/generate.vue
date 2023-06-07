<template>
  <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Users',link:'USERS'},{name:'Generate New Users'}]" />
  <row class="mt-3">
    <column col="12">
      <VCard title="Generate new users" body-class="!p-2">
        <FormKit id="generateUserForm" type="form" ref="generateUserForm"  @submit="generateUserFormSubmit"  :actions="false" >
          <row>
            <column md="4" col="12">
              <FormKit
                  validation="required"
                  validation-label="Concurrent user"
                  type="number"
                  :plugins="[castNumber]"
                  id="g_concurrent_user"
                  name="g_concurrent_user"
                  input-class=" font-main"
                  label="Concurrent user (Required)"
                  label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                  value="1"
                  :floating-label="true"
                  min="1"
              />
            </column>
            <column md="4" col="12">
              <FormKit
                  validation="required"
                  validation-label="Expiration Date"
                  type="date"
                  id="g_expiration_date"
                  name="g_expiration_date"
                  input-class=" font-main"
                  label="Expiration Date (Required)"
                  label-class="dark:text-primary-dark-2 !translate-x-[-1px] !text-0.7 !translate-y-[2px] bg-primary-light-1 dark:!bg-[#37404a] !font-main"
                  :floating-label="true"
              />
            </column>
            <column md="4" col="12">
              <FormKit
                  validation="required"
                  validation-label="Count"
                  type="number"
                  :plugins="[castNumber]"
                  id="g_count"
                  name="g_count"
                  input-class="font-main"
                  label="Count (Required)"
                  label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                  value="1"
                  :floating-label="true"
                  min="1"
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
      </VCard>
    </column>
  </row>
</template>

<script setup lang="ts">
import VBreadcrumb from '../../components/global/VBreadcrumb.vue'
import VCard from '../../components/global/VCard.vue'
import VBloader from '../../components/global/VBloader.vue'
import {useGenerate} from "../../composables/users/useGenerate";
const {castNumber,generateUserForm,submitForm,generateUserFormSubmit,generateUsersData,downloadGeneratedDataHandler,downloadAnchorElem}=useGenerate()
</script>

<style scoped>

</style>