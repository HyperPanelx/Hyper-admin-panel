import {useAuthStore,envVariable} from "./useStates";
import {inject} from "vue";
import {VueCookies} from "vue-cookies";
import {useRouter} from "vue-router";
import {useNotification} from "@kyvg/vue3-notification";

export const useLogout=()=>{
    const { notify }  = useNotification()
    const {authStore}=useAuthStore()
    const {cookieName}=envVariable()
    const $cookies = inject<VueCookies>('$cookies');
    const router=useRouter()

    const logoutHandler = async () => {
        /// remove cookie
        $cookies?.remove(cookieName as string,'/')
        /// reset store for update middleware
        authStore.$reset()
        router.push({name:'LOGIN'})
        notify({
            type:'warn',
            title:'Authorization',
            text:'You have been logged out!'
        })
    }


    return{
        logoutHandler
    }
}