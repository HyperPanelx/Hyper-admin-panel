import {useServerStore,envVariable,useAuthStore} from "./useStates";
import {onMounted, shallowRef, watch} from "vue";
import {useRouter} from "vue-router";
import {useChartRef} from "../customRef/chart";
import {useUserStatusRef} from "../customRef/userStatus";
import {IResponse, IUseChartRef, IUseUserStatusRef} from "../utils/Types";
import {dashboardStore} from "../store/dashboard";

export const useDashboard=()=>{
    //// stores
    const {serverStore,isEnable}=useServerStore()
    const {apiBase}=envVariable()
    const {token}=useAuthStore()
    const {getServerIP}=useServerStore()
    /// states
    const fetchDashboardDataFlag=shallowRef<boolean>(false);
    const serverStatus=useChartRef<IUseChartRef|null>(null);
    const usersStatusData=useUserStatusRef<IUseUserStatusRef[]>([]);

    /// router
    const router=useRouter()
    let timer:any=null;

    const changeServer =async (ev) => {
        const target=ev.target.value
        if(isEnable.value(target)){
            clearTimeout(timer)
            serverStore.changeServerIP('enable',target)
            await triggerInitialFetchData()
        }else{
            serverStore.changeServerIP('disable')
        }
    }

    const getServerUsageData = async () => {
        fetchDashboardDataFlag.value=false
        try {
            const request=await fetch(apiBase+`server-resource-usage?server=${getServerIP.value}`,{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token.value}`
                }
            })
            const response=await request.json();
            serverStatus.value=response as IUseChartRef
        }catch (err) {
            console.log(err)
        }finally {
            fetchDashboardDataFlag.value=true
        }
    }

    const triggerInitialFetchData = async () => {
        document.body.style.overflowY='hidden'
        dashboardStore.showPreloaderFlag=true
        try {
            await getServerUsageData();
            const request=await fetch(apiBase+`user-status?server=${getServerIP.value}`,{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token.value}`
                }
            });
            const response:IResponse<IUseUserStatusRef[]>=await request.json();
            if(response.success){
                usersStatusData.value=response.data
            }else{
                console.log(response)
            }
        }catch (err) {
            console.log(err)
        }finally {
            dashboardStore.showPreloaderFlag=false
            document.body.style.overflowY='auto'
        }

    }


    onMounted(async ()=>{
        await triggerInitialFetchData();
    })



    watch(
        ()=>fetchDashboardDataFlag.value,
         ()=>{
            if(fetchDashboardDataFlag.value){
                timer= setTimeout(async ()=>{
                    await getServerUsageData();
                },20000)
            }
        },{
            immediate:true,
        }
    )

    router.afterEach((to,from)=>{
        if(to.name!=='DASHBOARD' && from.name==='DASHBOARD'){
            /// exit dashboard page
            fetchDashboardDataFlag.value=false
            clearTimeout(timer)
        }
    })

    return{
        changeServer,serverStatus,
        usersStatusData,fetchDashboardDataFlag
    }
}