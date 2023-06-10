import {useTableStore} from "../useStates";


export const useCheckBox=(props:any)=>{
    const {tableStore}=useTableStore()

    const checkboxHandler = () => {
        if(tableStore.selectedUserToDelete.includes(props.user)){
            const idx=tableStore.selectedUserToDelete.findIndex(item=>item===props.user)
            tableStore.selectedUserToDelete.splice(idx,1)
        }else{
            tableStore.selectedUserToDelete.push(props.user)
        }
    }






    return{
     checkboxHandler
    }
}