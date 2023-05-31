import {IUsers_Data} from "~/utils/Types";

export const useUserOperation=(props:any)=>{
    const downloadAnchorElem=ref<HTMLAnchorElement|null>(null);
    const dropdownFlag=ref<boolean>(false);
    const showPasswordFlag=ref<boolean>(false);
    const {tableData,fetchTableDataFlag}=useStates()
    const operationData=reactive({
        name:'',
        modal:false,
        username:'',
        newPassword:'',
        changePassword:false
    })

    const editUser = (uid:string|number) => {
        console.log(uid)

    }

    const toggleDropdown = () => {
        dropdownFlag.value=!dropdownFlag.value
    }

    const downloadUserDetail = ()  => {
        if(downloadAnchorElem.value && process.client){
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
        fetchTableDataFlag.value=false
        try {
            const deleteUserRequest=await $fetch(`/api/users/${props.user}`,{
                method:'DELETE'
            })
            operationData.modal=false
            const userIndex=tableData.value.rows.findIndex((item:any)=>item.uid===props.uid)
            tableData.value.rows.splice(userIndex,1)
        }catch (err) {
            console.log(err)
        }finally {
            fetchTableDataFlag.value=true
        }
    }
    const changePassword = async () => {
        dropdownFlag.value=false
        operationData.modal=false
        // fetchTableDataFlag.value=false
        try {
            const changePasswordRequest=await $fetch<{password:string,username:string}>(`/api/users/${props.user}`,{
                method:'POST'
            })
            operationData.newPassword=changePasswordRequest.password
            operationData.changePassword=true
            operationData.name='Password'
            operationData.modal=true
            const userIndex=tableData.value.rows.findIndex((item:any)=>item.uid===props.uid);
            (tableData.value as IUsers_Data).rows[userIndex].passwd=changePasswordRequest.password
        }catch (err) {
            console.log(err)
        }finally {
            // fetchTableDataFlag.value=true
        }

    }

    const lockUser = () => {

    }

    const unlockUser = () => {

    }


    ////// select operation
    const selectOperation = (name:string) => {
        operationData.name=name
        operationData.modal=true
        operationData.username=props.user
        operationData.newPassword=''
        operationData.changePassword=false
    }





    return{
        editUser,downloadUserDetail,toggleDropdown,downloadAnchorElem,dropdownFlag,showPasswordFlag,deleteUser,operationData,selectOperation,changePassword,lockUser,unlockUser
    }
}