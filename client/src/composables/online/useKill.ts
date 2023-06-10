import {useTableStore,useAuthStore,envVariable,useDashboardStore} from "../useStates";
import {ref} from "vue";
import { useNotification } from "@kyvg/vue3-notification";
export const useKill=(props:any)=>{
    const { notify }  = useNotification()
    const {apiBase,apiKey}=envVariable()
    const {tableStore}=useTableStore()
    const {token}=useAuthStore()
    const {dashboardStore}=useDashboardStore()


    const modalFlag=ref<boolean>(false);
    const killUser =async () => {
        tableStore.fetchTableDataFlag=false
        dashboardStore.showPreloaderFlag=true

        fetch(apiBase+`/user/kill-online/${props.user}`,{
            method:'POST',
            headers:{
                Authorization:apiKey,
                token:token.value
            },
        }).
        then(()=>{
            const userIndex=tableStore.tableData.rows.findIndex((item:any)=>item.uid===props.uid)
            tableStore.tableData.rows.splice(userIndex,1)
            notify({
                type:'warn',
                title:'Kill User Operation',
                text:'User is killed successfully!'
            })
        }).
        catch(err=>{
            console.log(err)
            notify({
                type:'error',
                title:'Kill User Operation',
                text:'Operation failed! Error in connecting to server.'
            })
        }).
        finally(()=>{
            modalFlag.value=false
            tableStore.fetchTableDataFlag=true
            dashboardStore.showPreloaderFlag=false
        })

    };





    return{
       killUser,modalFlag
    }
}