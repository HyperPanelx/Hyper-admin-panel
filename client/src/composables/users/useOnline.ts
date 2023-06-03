import {IOnline_Users_Data} from "~/utils/Types";


export const useOnlineUsers=()=>{
    const {showPreloaderFlag,fetchTableDataFlag,tableData}=useStates();
    const {public:{internalApiKey,internalApiBase}}=useRuntimeConfig();


    onMounted(async ()=>{
        tableData.value={rows:[],titles:[]}
        fetchTableDataFlag.value=false
        showPreloaderFlag.value=true
        try {
            const getTableDataRequest:IOnline_Users_Data=await $fetch('/api/user/online-list',{
                headers:{Authorization:internalApiKey},
                baseURL:internalApiBase,
                credentials: "include"
            })
            tableData.value=getTableDataRequest
        }catch (err) {
            console.log(err)
        }finally {
            fetchTableDataFlag.value=true
            showPreloaderFlag.value=false
        }
    })


    return{
        tableData,fetchTableDataFlag
    }
}