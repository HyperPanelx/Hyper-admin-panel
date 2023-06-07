import {useDashboardStore} from "./useStates";
import {onMounted,watch} from "vue";
import {useRouter} from "vue-router";



export const useDashboard=()=>{
    /// dashboard store
    const {dashboardStore}=useDashboardStore()
    /// router
    const router=useRouter()
    let timer:any=null;



    onMounted(async ()=>{
       await dashboardStore.triggerInitialFetchData()
    })

    watch(
        ()=>dashboardStore.fetchDashboardDataFlag,
         ()=>{
            if(dashboardStore.fetchDashboardDataFlag){
                timer= setTimeout(async ()=>{
                    await dashboardStore.getServerUsageData();
                },15000)
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

}