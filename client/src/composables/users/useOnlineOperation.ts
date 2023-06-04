

export const useOnlineUserOperation=(props:any)=>{
    const {fetchTableDataFlag,tableData,showPreloaderFlag,token}=useStates();
    const selectedOnlineUserToKill=useState<string[]>('selectedOnlineUserToKill',()=>[]);
    const {public:{apiBase,apiKey}}=useRuntimeConfig()

    const modalFlag=ref<boolean>(false);
    const killUser =async () => {
        fetchTableDataFlag.value=false
        showPreloaderFlag.value=true
        try {
            const killUserRequest=await $fetch(`/api/user/kill-online/${props.user}`,{
                method:'POST',baseURL:apiBase,credentials: "include",
                headers:{
                    Authorization:apiKey,
                    token:token.value
                },
            })
            const userIndex=tableData.value.rows.findIndex((item:any)=>item.uid===props.uid)
            tableData.value.rows.splice(userIndex,1)
            modalFlag.value=false
        }catch (err) {
            console.log(err)
        }finally {
            fetchTableDataFlag.value=true
            showPreloaderFlag.value=false
        }
    };
    const checkboxHandler = () => {
        if(selectedOnlineUserToKill.value.includes(props.user)){
            const idx=selectedOnlineUserToKill.value.findIndex(item=>item===props.user)
            selectedOnlineUserToKill.value.splice(idx,1)
        }else{
            selectedOnlineUserToKill.value.push(props.user)
        }
    }




    return{
        checkboxHandler,killUser,modalFlag


    }
}