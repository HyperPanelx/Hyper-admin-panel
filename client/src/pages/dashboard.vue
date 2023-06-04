<template>
  <container-full>
    <row >
      <column col="12" sm="6" lg="3">
          <VCard >
            <template v-slot:title>
              <Icon size="1.2rem" class="mr-0.5 text-gray-700 dark:text-primary-light-1" name='bi:cpu-fill' />
              cpu
            </template>
            <template v-slot:body>
              <apexchart v-if="fetchDashboardDataFlag"
                  type="radialBar"
                  height="260"
                  :options="serverStatusChartOption(serverStatus.cpu,'CPU').chartOptions"
                  :series="serverStatusChartOption(serverStatus.cpu,'CPU').series">
              </apexchart>
              <div v-else class="section-loader">
                <hollow-dots-spinner
                    :animation-duration="1000"
                    :dot-size="15"
                    :dots-num="3"
                    color="#727cf5"
                />
              </div>
            </template>
          </VCard>
      </column>
      <column col="12" sm="6" lg="3">
        <VCard >
          <template v-slot:title>
            <Icon size="1.2rem" class="mr-0.5 text-gray-700 dark:text-primary-light-1" name='bi:pc-display' />
            ram
          </template>
          <template v-slot:body>
            <apexchart v-if="fetchDashboardDataFlag"
                type="radialBar"
                height="260"
                :options="serverStatusChartOption(serverStatus.ram,'RAM').chartOptions"
                :series="serverStatusChartOption(serverStatus.ram,'RAM').series">
            </apexchart>
            <div v-else class="section-loader">
              <hollow-dots-spinner
                  :animation-duration="1000"
                  :dot-size="15"
                  :dots-num="3"
                  color="#727cf5"
              />
            </div>
          </template>
          </VCard>
      </column>
      <column col="12" sm="6" lg="3">
        <VCard >
          <template v-slot:title>
            <Icon size="1.2rem" class="mr-0.5 text-gray-700 dark:text-primary-light-1" name='bi:motherboard-fill' />
            disk
          </template>
          <template v-slot:body>
            <apexchart
                v-if="fetchDashboardDataFlag"
                type="radialBar"
                height="260"
                :options="serverStatusChartOption(serverStatus.disk,'DISK').chartOptions"
                :series="serverStatusChartOption(serverStatus.disk,'DISK').series"></apexchart>
            <div v-else class="section-loader">
              <hollow-dots-spinner
                  :animation-duration="1000"
                  :dot-size="15"
                  :dots-num="3"
                  color="#727cf5"
              />
            </div>
          </template>
          </VCard>
      </column>
      <column col="12" sm="6" lg="3">
        <VCard body-class="!px-1.5 !pb-0">
          <template v-slot:title>
            <Icon size="1.2rem" class="mr-0.5 text-gray-700 dark:text-primary-light-1" name='mdi:printer-pos-network' />
            bandwidth
          </template>
          <template  v-slot:body>
            <apexchart
                v-if="fetchDashboardDataFlag"
                :class="{'md:!left-[-65px]':sidebarCollapseFlag}"
                class="md:left-[-83px] dark:[&_*]:!text-primary-light-1 left-[-35px] relative"
                type="donut"
                width="350"
                height="300"
                :options="bandWidthOption(serverStatus.bandWidth.downloadSpeed,serverStatus.bandWidth.uploadSpeed,serverStatus.bandWidth.speedUnit).chartOptions"
                :series="bandWidthOption(serverStatus.bandWidth.downloadSpeed,serverStatus.bandWidth.uploadSpeed,serverStatus.bandWidth.speedUnit).series"></apexchart>
            <div v-else class="section-loader !h-17">
              <hollow-dots-spinner
                  :animation-duration="1000"
                  :dot-size="15"
                  :dots-num="3"
                  color="#727cf5"
              />
            </div>
          </template>
        </VCard>
      </column>
    </row>
    <row class="my-1.5" >
      <column v-for="item in usersData" col="12" sm="6" lg="3">
        <DashboardCard :title="item.title" :number="item.number" :theme="item.theme"/>
      </column>
    </row>
  </container-full>
</template>

<script setup lang="ts">
definePageMeta({name:'DASHBOARD'})
import {serverStatusChartOption,bandWidthOption} from "~/utils/Data";
import { HollowDotsSpinner } from 'epic-spinners'
const {fetchDashboardDataFlag,usersData,serverStatus}=useDashboard()
const {sidebarCollapseFlag}=useStates()
const {public:{apiKey,apiBase}}=useRuntimeConfig()

</script>

<style >
@tailwind components;
@layer components {
  .section-loader{
    @apply h-15 flex w-full justify-center items-center
  }
}
</style>