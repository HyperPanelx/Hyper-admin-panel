import {useRouter} from "vue-router";
import {dashboardStore} from '../store/dashboard'
import {onMounted} from "vue";
import {useServerStore} from "./useStates";

export const useRouteLoader=()=>{
    const router=useRouter()
    const {serverStore}=useServerStore();

    onMounted(()=>{
        //// fetching servers list on app start
        serverStore.fetchServersList()
    });

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