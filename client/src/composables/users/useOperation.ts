import {IUsers_Data} from "../../utils/Types";
import {envVariable} from "../useStates";
import {ref,reactive} from "vue";
import {useTableStore,useAuthStore,useDashboardStore} from "../useStates";
import { useNotification } from "@kyvg/vue3-notification";
import {downloadTextFile} from "../../utils/Helper";


export const useUserOperation=(props:any)=>{
    const { notify }  = useNotification()
    const {apiBase,apiKey}=envVariable()
    const downloadAnchorElem=ref<HTMLAnchorElement|null>(null);
    const dropdownFlag=ref<boolean>(false);
    const showPasswordFlag=ref<boolean>(false);
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

    const checkboxHandler = () => {
        if(tableStore.selectedUserToDelete.includes(props.user)){
            const idx=tableStore.selectedUserToDelete.findIndex(item=>item===props.user)
            tableStore.selectedUserToDelete.splice(idx,1)
        }else{
            tableStore.selectedUserToDelete.push(props.user)
        }
    }

    const editUser = (uid:string|number) => {
        console.log(uid)

    }
    const toggleDropdown = () => {
        dropdownFlag.value=!dropdownFlag.value
    }
    const downloadUserDetail = ()  => {
        if(downloadAnchorElem.value){
            const text:string=`username:${props.user}\npassword:${props.passwd}\nphone:${props.phone}\nemail:${props.email}\nexpired:${props.exdate}\nstatus:${props.status}\ntelegram id:${props.telegram_id}\nregistered:${props?.registered ?? ''}\ntraffic:${props.traffic}\nlimitation:${props.multi}\ndescription:${props.desc}\nreferral:${props.referral}\n
            `
            downloadAnchorElem.value.setAttribute("href",     downloadTextFile(text)     );
            downloadAnchorElem.value.setAttribute("download", `${props.user}.txt`);
            downloadAnchorElem.value.click();
        }
    }

    ///// setting operations
    const deleteUser = async () => {
        dropdownFlag.value=false
        dashboardStore.showPreloaderFlag=true
        tableStore.fetchTableDataFlag=false
        fetch(apiBase+`/user/delete/${props.user}`,{
            method:'DELETE',
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
                title:'Delete Operation',
                text:'User deleted successfully!'
            })
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
            tableStore.fetchTableDataFlag=true
            dashboardStore.showPreloaderFlag=false
        })

    }
    const changePassword = async () => {
        dropdownFlag.value=false
        operationData.modal=false
        fetch(apiBase+`/user/change-password/${props.user}`,{
            method:'POST',
            headers:{
                Authorization:apiKey,
                token:token.value
            },
        }).
        then(response=>response.json()).
        then(response=>{
            operationData.newPassword=response.password
            operationData.changePassword=true
            operationData.name='Password'
            operationData.modal=true
            const userIndex=tableStore.tableData.rows.findIndex((item:any)=>item.uid===props.uid);
            (tableStore.tableData as IUsers_Data).rows[userIndex].passwd=response.password
            notify({
                type:'success',
                title:'Change Password Operation',
                text:'Password Changed successfully!'
            })
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
        fetch(apiBase+`/user/lock/${props.user}`,{
            method:'POST',
            headers:{
                Authorization:apiKey,
                token:token.value
            }
        }).
        then(()=>{
            notify({
                type:'success',
                title:'Lock User Operation',
                text:'User locked successfully!'
            })
            const userIndex=tableStore.tableData.rows.findIndex((item:any)=>item.uid===props.uid);
            (tableStore.tableData as IUsers_Data).rows[userIndex].status='disable';
        }).catch(err=>{
            notify({
                type:'error',
                title:'Lock User Operation',
                text:'Operation failed! Error in connecting to server.'
            })
        }).finally(()=>{
            operationData.modal=false
        })
    }
    const unlockUser =async () => {
        dropdownFlag.value=false
        fetch(apiBase+`/user/unlock/${props.user}`,{
            method:'POST',
            headers:{
                Authorization:apiKey,
                token:token.value
            }
        }).
        then(()=>{
            const userIndex=tableStore.tableData.rows.findIndex((item:any)=>item.uid===props.uid);
            (tableStore.tableData as IUsers_Data).rows[userIndex].status='enable';
            notify({
                type:'warn',
                title:'Unlock User Operation',
                text:'User unlocked successfully!'
            })
        }).catch(err=>{
            console.log(err)
            notify({
                type:'error',
                title:'Unlock User Operation',
                text:'Operation failed! Error in connecting to server.'
            })
        }).finally(()=>{
            operationData.modal=false
        })
    }
    const renewUser = async (value:any) => {
        dropdownFlag.value=false
        fetch(apiBase+`/user/renew-user/${props.user}`,{
            method:'POST',
            body:JSON.stringify({date:value.new_exp}),
            headers:{
                Authorization:apiKey,
                token:token.value,
                'Content-Type':'application/json'
            },
        }).
        then(()=>{
            const userIndex=tableStore.tableData.rows.findIndex((item:any)=>item.uid===props.uid);
            (tableStore.tableData as IUsers_Data).rows[userIndex].exdate=value.new_exp;
            operationData.renewUser=false
            notify({
                type:'success',
                title:'Renew User Operation',
                text:'User renewed successfully!'
            })
        }).catch(err=>{
            console.log(err)
            notify({
                type:'error',
                title:'Renew User Operation',
                text:'Operation failed! Error in connecting to server.'
            })
        }).finally(()=>{
            operationData.modal=false
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
        editUser,downloadUserDetail,toggleDropdown,downloadAnchorElem,dropdownFlag,showPasswordFlag,deleteUser,operationData,selectOperation,changePassword,lockUser,unlockUser,handlers,renewUser,newExpirationDateForm,checkboxHandler
    }
}