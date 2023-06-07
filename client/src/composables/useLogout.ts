import {useAuthStore,envVariable} from "./useStates";
import {inject} from "vue";
import {VueCookies} from "vue-cookies";
import {useRouter} from "vue-router";

export const useLogout=()=>{
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
    }


    return{
        logoutHandler
    }
}