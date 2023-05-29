import {IUsers_Data,IServer_Status} from "~/utils/Types";

export const useDashboard=()=>{
    const {showPreloaderFlag}=useStates()
    const fetchDashboardDataFlag=useState<boolean>('fetchServerDataFlag',()=>false)
    const usersData=useState<IUsers_Data[]>('usersData',()=>[])
    const serverStatus=useState<IServer_Status>('serverStatus',()=>{
        return{
            cpu:0,
            ram:0,
            disk:0,
            bandWidth:{
                download:0,
                upload:0
            }
        }
    })
    const {public:{internalApiKey}}=useRuntimeConfig()

    onMounted(async ()=>{
        showPreloaderFlag.value=true
        fetchDashboardDataFlag.value=false
        try {
            const serverStatusFetchRequest=await $fetch('/api/server',{
                headers:{Authorization:internalApiKey}
            })
            const usersDataFetchRequest=await $fetch('/api/users/status',{
                headers:{Authorization:internalApiKey}
            })
            serverStatus.value=serverStatusFetchRequest
            usersData.value=usersDataFetchRequest
        }catch (err) {
            console.log(err)
        }finally {
            fetchDashboardDataFlag.value=true
            showPreloaderFlag.value=false
        }
    })



    return{
        serverStatus,fetchDashboardDataFlag,usersData
    }
}