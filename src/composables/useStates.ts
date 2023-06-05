import {Auth} from '../store/auth'
import {computed} from "vue";

export const envVariable=()=>{
    const apiBase=process.env.API_BASE;
    const cookieName=process.env.COOKIE_NAME;



    return{
        apiBase,cookieName
    }
}

export const useAuthStore=()=>{
    const authStore=Auth()
    const username=computed(()=>authStore.username)
    const isLogin=computed(()=>authStore.isLogin)


    return {authStore,username,isLogin}
}