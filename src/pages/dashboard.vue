<template>
  <container-full >

    <row class="mb-1.5">
      <column col="12" md="5" class="flex items-center">
        <p class="text-gray-700 text-0.9 mr-0.5 dark:text-primary-dark-3">
          Switch Server:
        </p>
        <div class="w-15">
          <VServer @fire="changeServer($event)"/>
        </div>

      </column>
    </row>

    <row >
      <column col="12" sm="6" lg="3">
        <VCard >
          <template v-slot:title>
            <font-awesome-icon  class="mr-0.5 text-1 text-gray-700 dark:text-primary-light-1" icon='fa-solid fa-microchip' />
            cpu
          </template>
          <template v-slot:body>
            <apexchart v-if="fetchDashboardDataFlag"
                       type="radialBar"
                       height="260"
                       :options="serverStatusChartOption(serverStatus.cpu,'CPU')?.chartOptions ?? null"
                       :series="serverStatusChartOption(serverStatus.cpu,'CPU')?.series ?? null">
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
            <font-awesome-icon class="mr-0.5 text-gray-700 dark:text-primary-light-1" icon='fa-solid fa-server text-1.2' />
            ram
          </template>
          <template v-slot:body>
            <apexchart v-if="fetchDashboardDataFlag"
                       type="radialBar"
                       height="260"
                       :options="serverStatusChartOption(serverStatus.ram,'RAM')?.chartOptions ?? null"
                       :series="serverStatusChartOption(serverStatus.ram,'RAM')?.series ?? null">
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
            <font-awesome-icon class="mr-0.5 text-1 text-gray-700 dark:text-primary-light-1" icon='fa-solid fa-hard-drive' />
            disk
          </template>
          <template v-slot:body>
            <apexchart
                v-if="fetchDashboardDataFlag"
                type="radialBar"
                height="260"
                :options="serverStatusChartOption(serverStatus.disk,'DISK')?.chartOptions ?? null"
                :series="serverStatusChartOption(serverStatus.disk,'DISK')?.series ?? null"></apexchart>
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
            <font-awesome-icon class="mr-0.5 text-1 text-gray-700 dark:text-primary-light-1" icon='fa-solid fa-signal' />
            bandwidth
          </template>
          <template  v-slot:body>
            <apexchart
                v-if="fetchDashboardDataFlag && serverStatus.bandWidth"
                :class="{'lg:!left-[-65px]':sidebarCollapseFlag}"
                class="md:left-[-83px] dark:[&_*]:!text-primary-light-1 lg:left-[-85px] sm:left-[-68px] left-[-10px] relative"
                type="donut"
                width="350"
                height="300"
                :options="bandWidthOption(serverStatus?.bandWidth?.downloadSpeed,serverStatus?.bandWidth.uploadSpeed,serverStatus?.bandWidth?.speedUnit)?.chartOptions"
                :series="bandWidthOption(serverStatus?.bandWidth?.downloadSpeed,serverStatus?.bandWidth.uploadSpeed,serverStatus?.bandWidth?.speedUnit).series">
            </apexchart>
            <div class="w-full h-[272px] pb-1 flex justify-center items-center" v-else-if="fetchDashboardDataFlag && !serverStatus.bandWidth">
              <p class="text-0.9 text-gray-700 dark:text-primary-dark-3">
                There is no data to show.
              </p>
            </div>
            <div v-else-if="!fetchDashboardDataFlag" class="section-loader !h-17">
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
    <row class="my-1.5" v-if="usersStatusData.length>0">
      <column v-for="item in usersStatusData " col="12" sm="6" lg="3">
        <DashboardCard :title="item.title" :number="item.number " :theme="item.theme "/>
      </column>
    </row>
  </container-full>
</template>

<script setup lang="ts">
import VCard from '../components/global/VCard.vue'
import DashboardCard from '../components/Dashboard/Card.vue'
import {serverStatusChartOption,bandWidthOption} from "../utils/Helper";
import { HollowDotsSpinner } from 'epic-spinners';
import {useDashboard} from "../composables/useDashboard";
import {useDashboardStore} from "../composables/useStates";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import VServer from '../components/global/VServer.vue'
//////////////////////////////////////////////////////////////////
const {sidebarCollapseFlag,fetchDashboardDataFlag,usersStatusData,serverStatus}=useDashboardStore();
const {changeServer}=useDashboard();

</script>

<style scoped>
@tailwind components;
@layer components {
  .section-loader{
    @apply h-15 flex w-full justify-center items-center
  }
  .choices{
    @apply !w-[60%] m-0
  }

}
</style>