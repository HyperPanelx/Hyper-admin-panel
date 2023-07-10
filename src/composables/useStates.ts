import {Auth} from '../store/auth'
import {Dashboard} from "../store/dashboard";
import {Table} from "../store/table";
import {Server} from "../store/server";
import {computed} from "vue";
import {IUsers_Data, IOnline_Users_Data, INotification} from "../utils/Types";
import {storeToRefs} from "pinia";

export const envVariable=()=>{
    const apiBase:string|undefined=process.env.API_BASE || 'http://localhost/';
    const cookieName:string|undefined=process.env.COOKIE_NAME || 'fb69cda06c628';
    const appVersion:string|undefined=process.env.VERSION || '1.0.0';
    const server_ip:string|undefined=process.env.SERVER_IP || 'localhost'

    return{
        apiBase,cookieName,appVersion,server_ip
    }
}

export const useAuthStore=()=>{
    const authStore=Auth()
    const username=computed<string>(()=>authStore.username)
    const isLogin=computed<boolean>(()=>authStore.isLogin)
    const token=computed<string>(()=>authStore.token)


    return {authStore,username,isLogin,token}
}


export const useDashboardStore=()=>{
    const dashboardStore=Dashboard()
    const {isUserExpired,getUserExpiredDetail}=storeToRefs(dashboardStore)
    ////////////////////////////////////////////
    const sidebarCollapseFlag=computed<boolean>(()=>dashboardStore.sidebarCollapseFlag)
    const showPreloaderFlag=computed<boolean>(()=>dashboardStore.showPreloaderFlag)
    const fetchDashboardDataFlag=computed<boolean>(()=>dashboardStore.fetchDashboardDataFlag)
    const usersStatusData=computed(()=>dashboardStore.usersStatusData)
    const serverStatus=computed(()=>dashboardStore.serverStatus)
    const getNotificationData=computed<INotification[]>(()=>dashboardStore.notificationData);
    const newsNotificationData=computed<INotification[]>(()=>dashboardStore.getNewsNotification);
    const warningNotificationData=computed<INotification[]>(()=>dashboardStore.getWarningNotification);
    const dangerNotificationData=computed<INotification[]>(()=>dashboardStore.getDangerNotification);
    const windowWidth:null|number= window.innerWidth

    return{
        sidebarCollapseFlag,windowWidth,dashboardStore,showPreloaderFlag,fetchDashboardDataFlag,usersStatusData,serverStatus,getNotificationData,newsNotificationData,
        warningNotificationData, dangerNotificationData,isUserExpired,getUserExpiredDetail
    }
}

export const useTableStore=()=>{
    const tableStore=Table()
    const {filterUser}=storeToRefs(tableStore)
    ///////////////////////
    const tableData=computed<IOnline_Users_Data | IUsers_Data>(()=>tableStore.tableData)
    const fetchTableDataFlag=computed<boolean>(()=>tableStore.fetchTableDataFlag)
    const selectedUserToDelete=computed<string[]>(()=>tableStore.selectedUserToDelete)
    const selectedOnlineUserToKill=computed<string[]>(()=>tableStore.selectedOnlineUserToKill)
    const paginationData=computed<any>(()=>tableStore.paginationData)
    const searchText=computed<string>(()=>tableStore.searchText)
    const resetPaginationControl=computed<boolean>(()=>tableStore.paginationData.resetFlag)


    return{
        tableData,
        fetchTableDataFlag,
        selectedUserToDelete,
        selectedOnlineUserToKill,
        tableStore,paginationData,
        searchText,filterUser,resetPaginationControl
    }
}


export const useServerStore=()=>{
    const serverStore=Server()
    const {getServerIP,getHostList,isEnable}=storeToRefs(serverStore)
    const fetchServerListsFlag=computed<boolean>(()=>serverStore.fetchServerListFlag)



    return{
        getServerIP,serverStore,getHostList,fetchServerListsFlag,isEnable
    }
}