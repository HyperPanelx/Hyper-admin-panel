import {IUsers_Data} from "~/utils/Types";

export const useUsersList=()=>{
    const {showPreloaderFlag,fetchTableDataFlag,tableData}=useStates();
    const {public:{internalApiKey,internalApiBase}}=useRuntimeConfig();


    onMounted(async ()=>{
        tableData.value={rows:[],titles:[]}
        fetchTableDataFlag.value=false
        showPreloaderFlag.value=true
        try {
            const getTableDataRequest:IUsers_Data=await $fetch('/api/user/list',{
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