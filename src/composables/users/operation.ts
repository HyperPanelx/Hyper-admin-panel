

export const useUserOperation=(props:any)=>{
    const downloadAnchorElem=ref<HTMLAnchorElement|null>(null);
    const dropdownFlag=ref<boolean>(false);
    const showPasswordFlag=ref<boolean>(false);
    const {tableData,fetchTableDataFlag}=useStates()
    const operationData=reactive({
        name:'',
        modal:false,
        username:''
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
            const deleteUserRequest=await $fetch('/api/users/delete',{
                method:'DELETE',body:{username:props.user}
            })
            tableData.value.rows.splice(props.index,1)
            operationData.modal=false
            fetchTableDataFlag.value=true
        }catch (err) {
            console.log(err)
        }
    }
    const changePassword = () => {

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
    }





    return{
        editUser,downloadUserDetail,toggleDropdown,downloadAnchorElem,dropdownFlag,showPasswordFlag,deleteUser,operationData,selectOperation,changePassword,lockUser,unlockUser
    }
}