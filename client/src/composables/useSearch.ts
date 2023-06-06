import {useDashboardStore} from "./useStates";

export const useSearch=(props:{modelValue:any},emit:any)=>{
    const {dashboardStore,searchContent}=useDashboardStore()

    const searchHandler = () => {
        emit('update:modelValue',searchContent.value.length > 0)
        dashboardStore.triggerSearch()
    }

    return{searchHandler}
}