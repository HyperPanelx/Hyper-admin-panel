import {IUsers_Data,IServer_Status} from "~/utils/Types";

export const useDashboard=()=>{
    const {showPreloaderFlag}=useStates()
    const fetchDashboardDataFlag=useState<boolean>('fetchServerDataFlag',()=>false)
    const usersData=useState<IUsers_Data[]>('usersData',()=>[])
    const {public:{apiKey,apiBase}}=useRuntimeConfig();
    const serverStatus=useState<IServer_Status>('serverStatus',()=>{
        return{
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
        }
    })



    const getDashboardData=async ()=>{
        showPreloaderFlag.value=true
        fetchDashboardDataFlag.value=false
        try {
            const serverStatusFetchRequest:IServer_Status=await $fetch('/api/dashboard/server',{
                headers:{Authorization:apiKey},
                baseURL:apiBase,
                keepalive:true,
                credentials: "include",
            })
            const usersDataFetchRequest:IUsers_Data[]=await $fetch('/api/dashboard/users-status',{
                headers:{Authorization:apiKey},
                baseURL:apiBase,
                credentials: "include",
            })
            usersData.value=usersDataFetchRequest
            serverStatus.value=serverStatusFetchRequest
        }catch (err) {
            console.log(err)
        }finally {
            fetchDashboardDataFlag.value=true
            showPreloaderFlag.value=false
        }
    }

    onMounted(async ()=>{
        await getDashboardData()
    })

    watch(
        ()=>fetchDashboardDataFlag.value,
         ()=>{
            if(fetchDashboardDataFlag.value){
                setTimeout(async ()=>{
                    await getDashboardData()
                },15000)
            }
        },{
            immediate:true,
        }
    )


    return{
        serverStatus,fetchDashboardDataFlag,usersData
    }
}