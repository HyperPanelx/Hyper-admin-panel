import {useDashboardStore} from "./useStates";
import {useRouter} from "vue-router";


export const useRouteLoader=()=>{
    const {dashboardStore}=useDashboardStore();
    const router=useRouter()
    router.beforeEach(()=>{
        // dashboardStore.showPreloaderFlag=true
        // document.body.style.overflowY='hidden'
    })

    router.beforeResolve((to,from)=>{
        dashboardStore.showPreloaderFlag = to.name === 'DASHBOARD' || to.name === 'USERS' || to.name === 'ONLINE';
        document.body.style.overflowY='auto'
    })
}