import {useDashboardStore} from "./useStates";
import {useRouter} from "vue-router";


export const useRouteLoader=()=>{
    const {dashboardStore}=useDashboardStore();
    const router=useRouter()
    router.beforeEach((to,from)=>{
       if (!to.query.page  || !from.query.page) {
           dashboardStore.showPreloaderFlag = true
       }
        document.body.style.overflowY='hidden'
    })

    router.beforeResolve((to,from)=>{
        if(to.query.page || from.query.page){
            dashboardStore.showPreloaderFlag = false
        }else{
            dashboardStore.showPreloaderFlag = to.name === 'DASHBOARD' || to.name === 'USERS' || to.name === 'ONLINE';
        }
        document.body.style.overflowY='auto'
    })
}