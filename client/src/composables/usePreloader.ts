import {useDashboardStore} from "./useStates";
import {useRouter} from "vue-router";

export const usePreloader=()=>{
    const {dashboardStore}=useDashboardStore()
    const router=useRouter()
    router.beforeEach((to,from,next)=>{
        //// turn on loader before page beeing fetched
        dashboardStore.showPreloaderFlag=true
        document.body.style.overflow='hidden'
        next()
    })

    router.beforeResolve((to,from,next)=>{
        //// turn off loader after page beeing fetched
        dashboardStore.showPreloaderFlag=false
        document.body.style.overflow='auto'
        document.body.style.overflowX='hidden'
        next()
    })

}