import {IUsers_Data,IServer_Status} from "~/utils/Types";

export const useDashboard=()=>{
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

    onMounted(async ()=>{
        fetchDashboardDataFlag.value=false
        try {
            const serverStatusFetchRequest=await $fetch('/api/server')
            const usersDataFetchRequest=await $fetch('/api/users')
            serverStatus.value=serverStatusFetchRequest
            usersData.value=usersDataFetchRequest
        }catch (err) {
            console.log(err)
        }finally {
            fetchDashboardDataFlag.value=true
        }
    })



    return{
        serverStatus,fetchDashboardDataFlag,usersData
    }
}