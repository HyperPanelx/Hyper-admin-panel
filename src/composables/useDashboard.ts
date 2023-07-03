import {useDashboardStore,useServerStore} from "./useStates";
import {onMounted, watch} from "vue";
import {useRouter} from "vue-router";




export const useDashboard=()=>{
    const {serverStore}=useServerStore()
    /// dashboard store
    const {dashboardStore}=useDashboardStore()
    /// router
    const router=useRouter()
    let timer:any=null;

    const changeServer =async (ev) => {
        serverStore.server_ip=ev.target.value
        serverStore.changeServerIP()
        clearTimeout(timer)
        await dashboardStore.triggerInitialFetchData()
    }

    onMounted(async ()=>{
        await dashboardStore.triggerInitialFetchData()
    })



    watch(
        ()=>dashboardStore.fetchDashboardDataFlag,
         ()=>{
            if(dashboardStore.fetchDashboardDataFlag){
                timer= setTimeout(async ()=>{
                    await dashboardStore.getServerUsageData();
                },20000)
            }
        },{
            immediate:true,
        }
    )

    router.afterEach((to,from)=>{
        if(to.name!=='DASHBOARD' && from.name==='DASHBOARD'){
            /// exit dashboard page
            dashboardStore.fetchDashboardDataFlag=false
            clearTimeout(timer)
        }
    })

    return{
        changeServer
    }
}