import {reactive} from "vue";

export const dashboardStore=reactive({
    sidebarCollapseFlag:false as boolean,
    showPreloaderFlag:false as boolean,
    fetchDashboardDataFlag:false as boolean,
})
