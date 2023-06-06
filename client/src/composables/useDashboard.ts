import {IUsers_Data,IServer_Status} from "../utils/Types";
import {useDashboardStore,useAuthStore,envVariable} from "./useStates";
import {reactive,ref,onMounted,watch} from "vue";
import {useRouter} from "vue-router";



export const useDashboard=()=>{
    const {dashboardStore}=useDashboardStore()
    const {token}=useAuthStore()
    const {apiKey,apiBase}=envVariable()
    const router=useRouter()
    const fetchDashboardDataFlag=ref<boolean>(false);
    const usersData=ref<IUsers_Data[]>([])
    let timer:any=null;
    const serverStatus=reactive<IServer_Status>({
        cpu:0,
        ram:0,
        disk:0,
        bandWidth:{
            download:0,
            upload:0,
            downloadSpeed:0,
            uploadSpeed:0,
            speedUnit:''
        }
    })



    const getServerUsageData=async ()=>{
        fetchDashboardDataFlag.value=false
        fetch(apiBase+'/dashboard/server',{
            headers:{
                Authorization:apiKey as string,
                token:token.value as any,
                'Content-Type':'application/json'
            },
        }).
        then(response=>response.json()).
        then(({cpu,ram,disk,bandWidth}:IServer_Status)=>{
            serverStatus.cpu=cpu
            serverStatus.ram=ram
            serverStatus.disk=disk
            serverStatus.bandWidth=bandWidth
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            fetchDashboardDataFlag.value=true
        })
    }

    onMounted(async ()=>{
        dashboardStore.showPreloaderFlag=true
        await getServerUsageData()
        await fetch(apiBase+'/dashboard/users-status',{
            headers:{
                Authorization:apiKey as string,
                token:token.value as any,
                'Content-Type':'application/json'
            },
        }).
        then(response=>response.json()).
        then(response=>{
            usersData.value=response
        }).
        catch(err=>console.log(err)).
        finally(()=>{
            dashboardStore.showPreloaderFlag=false
        })

    })

    watch(
        ()=>fetchDashboardDataFlag.value,
         ()=>{
            if(fetchDashboardDataFlag.value){
                timer= setTimeout(async ()=>{
                    await getServerUsageData();
                },15000)
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
        serverStatus,fetchDashboardDataFlag,usersData
    }
}