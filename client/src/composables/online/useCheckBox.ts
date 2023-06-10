import {useTableStore} from "../useStates";


export const useCheckBox=(props)=>{
    const {tableStore}=useTableStore()

    const checkboxHandler = () => {
        if(tableStore.selectedOnlineUserToKill.includes(props.user)){
            const idx=tableStore.selectedOnlineUserToKill.findIndex(item=>item===props.user)
            tableStore.selectedOnlineUserToKill.splice(idx,1)
        }else{
            tableStore.selectedOnlineUserToKill.push(props.user)
        }
    }



    return{
        checkboxHandler
    }
}