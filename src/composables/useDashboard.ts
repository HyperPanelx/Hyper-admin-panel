import {useDashboardStore,useServerStore} from "./useStates";
import {onMounted, watch} from "vue";
import {useRouter} from "vue-router";




export const useDashboard=()=>{
    const {serverStore,isEnable}=useServerStore()
    /// dashboard store
    const {dashboardStore}=useDashboardStore()
    /// router
    const router=useRouter()
    let timer:any=null;

    const changeServer =async (ev) => {
        const target=ev.target.value
        if(isEnable.value(target)){
            clearTimeout(timer)
            serverStore.server_ip=ev.target.value
            serverStore.changeServerIP('enable')
            await dashboardStore.triggerInitialFetchData()
        }else{
            serverStore.changeServerIP('disable')
        }

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