import {ITable_Data} from "~/utils/Types";

export const useUsersList=()=>{
    const tableData=useState<ITable_Data>('tableData')
    const fetchTableDataFlag=useState('fetchTableDataFlag',()=>false)
    const {showPreloaderFlag}=useStates()
    const {public:{internalApiKey}}=useRuntimeConfig()


    onMounted(async ()=>{
        fetchTableDataFlag.value=false
        showPreloaderFlag.value=true
        try {
            const getTableDataRequest:ITable_Data=await $fetch('/api/users/list',{
                headers:{Authorization:internalApiKey}})
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