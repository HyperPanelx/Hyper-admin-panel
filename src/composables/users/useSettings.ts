import {IResponse, IUsers_Data} from "../../utils/Types";
import {envVariable} from "../useStates";
import {ref,shallowReactive} from "vue";
import {useTableStore,useAuthStore,useServerStore} from "../useStates";
import { useNotification } from "@kyvg/vue3-notification";
import {querySerialize} from "../../utils/Helper";
import {notificationStore} from '../../store/notification'
import {dashboardStore} from "../../store/dashboard";

export const useSettings=(props:any)=>{
    const { notify }  = useNotification()
    const {apiBase}=envVariable()
    const dropdownFlag=ref<boolean>(false);
    const newExpirationDateForm=ref<HTMLFormElement|null>(null)
    const newMultiForm=ref<HTMLFormElement|null>(null)
    const changePasswordForm=ref<HTMLFormElement|null>(null)
    const {tableStore}=useTableStore()
    const {token}=useAuthStore()
    const {getServerIP}=useServerStore()
    const operationData=shallowReactive({
        name:'',
        modal:false,
        username:'',
        newPassword:'',
        renewUser:false,
        changeMulti:false,
        askPassword:false
    })
    const submitNewExpForm = () => {
        if(newExpirationDateForm.value){
            const node = (newExpirationDateForm.value as any).node
            node.submit()
        }
    };
    const submitNewMultiForm = () => {
        if(newMultiForm.value){
            const node = (newMultiForm.value as any).node
            node.submit()
        }
    };
    const submitChangePasswordForm = () => {
        if(changePasswordForm.value){
            const node = (changePasswordForm.value as any).node
            node.submit()
        }
    };

    const toggleDropdown = () => {
        dropdownFlag.value=!dropdownFlag.value
    }


    ///// setting operations
    const deleteUser =  () => {
        dropdownFlag.value=false
        dashboardStore.showPreloaderFlag=true
        tableStore.fetchTableDataFlag=false
        const query=querySerialize({username:props.user,server:getServerIP.value})
        fetch(apiBase+'user-delete?'+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token.value}`
            },
        }).
        then(response=>response.json()).
        then((response:IResponse<any>)=>{
            if(response.success){
                notify({
                    type:'success',
                    title:'Delete Operation',
                    text:'User deleted successfully!'
                })
                notificationStore.removeNotification(props.user)
            }else{
                notify({
                    type:'error',
                    title:'Delete Operation',
                    text:response.message
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
    const changePassword =  (data) => {
        dropdownFlag.value=false
        dashboardStore.showPreloaderFlag=true
        tableStore.fetchTableDataFlag=false
        const query=querySerialize({mode:'users',username:props.user,server:getServerIP.value,passwd:data.new_change_password})
        fetch(apiBase+`user-change-passwd?`+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token.value}`
            },
        }).
        then(response=>response.json()).
        then((response:IResponse<any>)=>{
            notify({
                type:'success',
                title:'Change Password Operation',
                text:'Password Changed successfully!'
            })
        }).catch(err=>{
            notify({
                type:'error',
                title:'Change Password Operation',
                text:'Operation failed! Error in connecting to server.'
            })
        }).finally(()=>{
            operationData.askPassword=false
            operationData.modal=false
            tableStore.getUsersList()
        })
    }
    const lockUser =  () => {
        dropdownFlag.value=false
        dashboardStore.showPreloaderFlag=true
        tableStore.fetchTableDataFlag=false
        const query=querySerialize({status :'lock',username:props.user,server:getServerIP.value})
        fetch(apiBase+`user-change-status?`+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token.value}`
            },
        }).
        then(response=>response.json()).
        then((response:IResponse<any>)=>{
            if(response.success){
                notify({
                    type:'success',
                    title:'Lock User Operation',
                    text:'User locked successfully!'
                })
            }else{
                notify({
                    type:'error',
                    title:'Lock User Operation',
                    text:response.message
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
    const unlockUser = () => {
        dropdownFlag.value=false
        dashboardStore.showPreloaderFlag=true
        tableStore.fetchTableDataFlag=false
        const query=querySerialize({status :'unlock',username:props.user,server:getServerIP.value})
        fetch(apiBase+`user-change-status?`+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token.value}`
            },
        }).
        then(response=>response.json()).
        then((response:IResponse<any>)=>{
            if(response.success){
                notify({
                    type:'success',
                    title:'Unlock User Operation',
                    text:'User unlocked successfully!'
                })

            }else{
                notify({
                    type:'error',
                    title:'Unlock User Operation',
                    text:response.message
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
    const renewUser =  (formData:any) => {
        dropdownFlag.value=false
        dashboardStore.showPreloaderFlag=true
        tableStore.fetchTableDataFlag=false
        const query=querySerialize({username:props.user,exdate:formData.new_exp})
        fetch(apiBase+`user-renew?`+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token.value}`
            },
        }).
        then(response=>response.json()).
        then((response:IResponse<any>)=>{
            if(response.success){
                operationData.renewUser=false
                notify({
                    type:'success',
                    title:'Renew User Operation',
                    text:'User renewed successfully!'
                })
            }else{
                notify({
                    type:'error',
                    title:'Renew User Operation',
                    text:response.message
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
    const changeMulti = (data) => {
        dropdownFlag.value=false
        dashboardStore.showPreloaderFlag=true
        tableStore.fetchTableDataFlag=false
        const query=querySerialize({
            username:operationData.username,
            multi:Number(data.new_multi)
        })
        fetch(apiBase+`user-change-multi?`+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token.value}`
            },
        }).
        then(response=>response.json()).
        then((response:IResponse<any>)=>{
            if(response.success){
                operationData.changeMulti=false
                notify({
                    type:'success',
                    title:'Change Multi Operation',
                    text:'User Multi updated!'
                })

            }else{
                notify({
                    type:'error',
                    title:'Change Multi Operation',
                    text:response.message
                })
            }
        }).catch(err=>{
            console.log(err)
            notify({
                type:'error',
                title:'Change Multi Operation',
                text:'Operation failed! Error in connecting to server.'
            })
        }).finally(()=>{
            operationData.modal=false
            tableStore.getUsersList()
        })
    }

    ////// select operation
    const selectOperation = (name:string) => {
        operationData.name=name
        operationData.modal=true
        operationData.username=props.user
        operationData.newPassword=''
        operationData.askPassword=name === 'Change password'
        operationData.renewUser = name === 'Renew user';
        operationData.changeMulti = name === 'Change Multi';
    }

    const handlers=(name:string)=>{
        if(name==='Delete user'){
            return {'click':deleteUser}
        }else if(name==='Change password'){
            return {'click':submitChangePasswordForm}
        }else if(name==='Lock user'){
            return {'click':lockUser}
        }else if(name==='Unlock user'){
            return {'click':unlockUser}
        }else if(name==='Renew user'){
            return {'click':submitNewExpForm}
        }else if(name==='Change Multi'){
            return {'click':submitNewMultiForm}
        }
    }



    return{
        toggleDropdown,dropdownFlag,selectOperation,operationData,handlers,renewUser,newExpirationDateForm,changeMulti,newMultiForm,changePassword,changePasswordForm
    }
}