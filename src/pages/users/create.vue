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
                    validation-label="password"
                    validation="required"
                    type="password"
                    id="password"
                    name="password"
                    input-class=" font-main"
                    label="Password (required)"
                    label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                    :floating-label="true"
                />

              </column>
            </row>
            <row class="my-1">
              <column col="12" md="6">
                <FormKit
                    validation="email"
                    type="text"
                    id="email"
                    name="email"
                    input-class=" font-main"
                    label="Email Address (like: abc@gmail.com)"
                    label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                    :floating-label="true"
                />
              </column>
              <column col="12" md="6">
                <FormKit
                    validation="required|matches:/^09\d{9}$/"
                    validation-label="Phone Number"
                    type="text"
                    id="phone"
                    name="phone"
                    input-class=" font-main"
                    label="Phone Number (Required) (like: 09xxxxxxxxx)"
                    label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                    :floating-label="true"
                />

              </column>
            </row>
            <row>
              <column col="12" md="6">
                <FormKit
                    validation="required"
                    validation-label="Concurrent user"
                    type="number"
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
              <column col="12" md="6">
                <FormKit
                    validation="required"
                    validation-label="Expiration Date"
                    type="date"
                    id="expiration_date"
                    name="expiration_date"
                    input-class=" font-main"
                    label="Expiration Date (Required)"
                    label-class="dark:text-primary-dark-2 !translate-x-[-1px] !text-0.7 !translate-y-[2px] bg-primary-light-1 dark:!bg-[#37404a] !font-main"
                    :floating-label="true"
                    help-class="dark:text-primary-dark-3"
                    help="Leave this field empty if you set the expiration date automatically."
                />

              </column>
            </row>
            <row  class="my-1">
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
                    fieldset-class="!border-[0px] dark:[&_*]!text-primary-light-1 !pl-0 !ml-0"
                    options-class="!flex gap-1 !flex-row"
                    type="radio"
                    :options="['Gigabyte', 'Megabyte']"
                    value="Gigabyte"
                    label-class="dark:!text-primary-light-1"
                />
              </column>
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
            </row>
            <row >
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
              <column col="12" md="6" >
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
          <div class="flex gap-2 items-center mt-2">
            <VBloader class="btn btn-indigo btn-md"
                      animation="slide-down"
                      :duration="2000"
                      type="submit"
                      @click="submitForm"
                      :loading="createSingleUserFetchFlag"
            >
              Submit
            </VBloader>
            <p class="text-gray-800 dark:text-primary-light-1" v-if="responseMessage.length>0 && !createSingleUserFetchFlag">{{responseMessage}}</p>
          </div>

        </FormKit>
      </VCard>
    </column>
  </row>

</template>

<script setup lang="ts">
definePageMeta({
  name:'CREATE_USER'
});
useHead({
  title:'User > Create'
});
const {createUserFormSubmit,createSingleUserFetchFlag,responseMessage,createSingleUserForm,submitForm}=useCreateUser()
</script>

<style scoped>

</style>