import {IUsers_Data,Response} from "../../utils/Types";
import {envVariable} from "../useStates";
import {ref,reactive} from "vue";
import {useTableStore,useAuthStore,useDashboardStore} from "../useStates";
import { useNotification } from "@kyvg/vue3-notification";
import {querySerialize} from "../../utils/Helper";

export const useSettings=(props:any)=>{
    const { notify }  = useNotification()
    const {apiBase}=envVariable()
    const dropdownFlag=ref<boolean>(false);
    const newExpirationDateForm=ref<HTMLFormElement|null>(null)
    const {tableStore}=useTableStore()
    const {token}=useAuthStore()
    const {dashboardStore}=useDashboardStore()
    const operationData=reactive({
        name:'',
        modal:false,
        username:'',
        newPassword:'',
        changePassword:false,
        renewUser:false
    })
    const submitNewExpForm = () => {
        if(newExpirationDateForm.value){
            const node = (newExpirationDateForm.value as any).node
            node.submit()
        }
    };



    const toggleDropdown = () => {
        dropdownFlag.value=!dropdownFlag.value
    }


    ///// setting operations
    const deleteUser = async () => {
        dropdownFlag.value=false
        dashboardStore.showPreloaderFlag=true
        tableStore.fetchTableDataFlag=false
        const query=querySerialize({username:props.user})
        fetch(apiBase+'delete-user?'+query,{
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
                    title:'Delete Operation',
                    text:response.detail
                })
            }else{
                notify({
                    type:'warn',
                    title:'Delete Operation',
                    text:'User deleted successfully!'
                })
            }
        }).
        catch(err=>{
            console.log(err)
            notify({
                type:'error',
                title:'Delete User Operation',
                text:'Operation failed! Error in connecting to server.'
            })
        }).
        finally(()=>{
            operationData.modal=false
            tableStore.getUsersList()
        })

    }
    const changePassword = async () => {
        dropdownFlag.value=false
        operationData.modal=false
        const query=querySerialize({mode:'users',username:props.user})
        fetch(apiBase+`change-passwd-user?`+query,{
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
                    title:'Change Password Operation',
                    text:response.detail
                })
            }else{
                operationData.newPassword=response.password
                operationData.changePassword=true
                operationData.name='Password'
                operationData.modal=true
                const userIndex=tableStore.tableData.rows.findIndex((item:any)=>item.uid===props.uid);
                (tableStore.tableData as IUsers_Data).rows[userIndex].passwd=response.password;
                notify({
                    type:'success',
                    title:'Change Password Operation',
                    text:'Password Changed successfully!'
                })
            }
        }).catch(err=>{
            operationData.modal=false
            notify({
                type:'error',
                title:'Change Password Operation',
                text:'Operation failed! Error in connecting to server.'
            })
        })
    }
    const lockUser = async () => {
        dropdownFlag.value=false
        dashboardStore.showPreloaderFlag=true
        tableStore.fetchTableDataFlag=false
        const query=querySerialize({username:props.user})
        fetch(apiBase+`lock-user?`+query,{
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
                    title:'Lock User Operation',
                    text:response.detail
                })
            }else{
                notify({
                    type:'success',
                    title:'Lock User Operation',
                    text:'User locked successfully!'
                })
            }

        }).catch(err=>{
            notify({
                type:'error',
                title:'Lock User Operation',
                text:'Operation failed! Error in connecting to server.'
            })
        }).finally(()=>{
            operationData.modal=false
            tableStore.getUsersList()
        })
    }
    const unlockUser =async () => {
        dropdownFlag.value=false
        dashboardStore.showPreloaderFlag=true
        tableStore.fetchTableDataFlag=false
        const query=querySerialize({username:props.user})
        fetch(apiBase+`unlock-user?`+query,{
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
                    title:'Unlock User Operation',
                    text:response.detail
                })
            }else{
                const userIndex=tableStore.tableData.rows.findIndex((item:any)=>item.uid===props.uid);
                (tableStore.tableData as IUsers_Data).rows[userIndex].status='enable';
                notify({
                    type:'warn',
                    title:'Unlock User Operation',
                    text:'User unlocked successfully!'
                })
            }
        }).catch(err=>{
            console.log(err)
            notify({
                type:'error',
                title:'Unlock User Operation',
                text:'Operation failed! Error in connecting to server.'
            })
        }).finally(()=>{
            operationData.modal=false
            tableStore.getUsersList()
        })
    }
    const renewUser = async (formData:any) => {
        dropdownFlag.value=false
        dashboardStore.showPreloaderFlag=true
        tableStore.fetchTableDataFlag=false
        const query=querySerialize({username:props.user,exdate:formData.new_exp})
        fetch(apiBase+`renew-user?`+query,{
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
                    title:'Renew User Operation',
                    text:response.detail
                })
            }else{
                operationData.renewUser=false
                notify({
                    type:'success',
                    title:'Renew User Operation',
                    text:'User renewed successfully!'
                })
            }
        }).catch(err=>{
            console.log(err)
            notify({
                type:'error',
                title:'Renew User Operation',
                text:'Operation failed! Error in connecting to server.'
            })
        }).finally(()=>{
            operationData.modal=false
            tableStore.getUsersList()
        })
    }
    /////


    ////// select operation
    const selectOperation = (name:string) => {
        operationData.name=name
        operationData.modal=true
        operationData.username=props.user
        operationData.newPassword=''
        operationData.changePassword=false
        operationData.renewUser = name === 'Renew user';
    }

    const handlers=(name:string)=>{
        if(name==='Delete user'){
            return {
                'click':deleteUser
            }
        }else if(name==='Change password'){
            return {
                'click':changePassword
            }
        }else if(name==='Lock user'){
            return {
                'click':lockUser
            }
        }else if(name==='Unlock user'){
            return {
                'click':unlockUser
            }
        }else if(name==='Renew user'){
            return {
                'click':submitNewExpForm
            }
        }
    }



    return{
        toggleDropdown,dropdownFlag,selectOperation,operationData,handlers,renewUser,newExpirationDateForm
    }
}