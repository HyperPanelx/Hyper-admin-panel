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
        $cookies?.remove(cookieName as string,'/')
        authStore.$reset()
        router.push({name:'LOGIN'})
    }


    return{
        logoutHandler
    }
}