import {useTableStore,useAuthStore,envVariable,useDashboardStore,useServerStore} from "../useStates";
import {ref} from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import {querySerialize} from "../../utils/Helper";

export const useKill=(props:any)=>{
    const { notify }  = useNotification()
    const {apiBase}=envVariable()
    const {tableStore}=useTableStore()
    const {token}=useAuthStore()
    const {dashboardStore}=useDashboardStore()
    const {getServerIP}=useServerStore()


    const modalFlag=ref<boolean>(false);
    const killUser =async () => {
        tableStore.fetchTableDataFlag=false
        dashboardStore.showPreloaderFlag=true
        const query=querySerialize({username:props.user,server:getServerIP.value})

        fetch(apiBase+'kill-user?'+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token.value}`
            },
        }).
        then(response=>response.json()).
        then((response)=>{
            if(response.detail){
                notify({
                    type:'error',
                    title:'Kill User Operation',
                    text:response.detail
                })
            }else{
                notify({
                    type:'success',
                    title:'Kill User Operation',
                    text:'User is killed successfully!'
                })
            }
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
            tableStore.getOnlineUsers()
        })

    };





    return{
       killUser,modalFlag
    }
}