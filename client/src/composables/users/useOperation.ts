import {IUsers_Data} from "../../utils/Types";
import {envVariable} from "../useStates";
import {ref,reactive} from "vue";
import {useTableStore,useAuthStore,useDashboardStore} from "../useStates";


export const useUserOperation=(props:any)=>{
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
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
                username:props.user,
                password:props.passwd,
                phone:props.phone,
                email:props.email,
                expired:props.exdate,
                status:props.status,
                telegram_id:props.telegram_id,
                registered:props.registered,
                traffic:props.traffic,
                limitation:props.multi,
                desc:props.desc,
                referral:props.referral,
            }));
            downloadAnchorElem.value.setAttribute("href",     dataStr     );
            downloadAnchorElem.value.setAttribute("download", `${props.user}.json`);
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
            operationData.modal=false
            const userIndex=tableStore.tableData.rows.findIndex((item:any)=>item.uid===props.uid)
            tableStore.tableData.rows.splice(userIndex,1)
        }).
        catch(err=>console.log(err)).
        finally(()=>{
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
            const userIndex=tableStore.tableData.rows.findIndex((item:any)=>item.uid===props.uid);
            (tableStore.tableData as IUsers_Data).rows[userIndex].status='disable';
            operationData.modal=false
        }).catch(err=>console.log(err))
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
            operationData.modal=false
        }).catch(err=>console.log(err))
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
            operationData.modal=false
        }).catch(err=>console.log(err))
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