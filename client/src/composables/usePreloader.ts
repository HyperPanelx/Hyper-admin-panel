import {useDashboardStore} from "./useStates";
import {useRouter} from "vue-router";

export const usePreloader=()=>{
    const {dashboardStore}=useDashboardStore()
    const router=useRouter()
    router.beforeEach((to,from,next)=>{
        dashboardStore.showPreloaderFlag=true
        document.body.style.overflow='hidden'
        next()
    })

    router.beforeResolve((to,from,next)=>{
        dashboardStore.showPreloaderFlag=false
        document.body.style.overflow='auto'
        next()
    })

}