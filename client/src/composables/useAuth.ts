import {inject, onMounted} from "vue";
import {VueCookies} from "vue-cookies";
import {envVariable,useAuthStore} from "./useStates";
import {useRouter} from "vue-router";



export const useAuth=()=>{
    const {apiBase,cookieName,apiKey}=envVariable()
    const router=useRouter()
    const {authStore}=useAuthStore()
    const $cookies = inject<VueCookies>('$cookies');
    onMounted(async ()=>{
        const token=$cookies?.get(cookieName as string)
        if(token){
            fetch(apiBase+'/api/auth/me',{
                // @ts-ignore
                headers:{
                    Authorization:apiKey,
                    token:token,
                    'Content-type':'application/json'
                },
                // @ts-ignore
                credentials: "include",
                baseURL:apiBase
            }).then(response=>response.json()).then(username=>{
                authStore.$patch({
                    username:username,
                    isLogin:true,
                    token:token
                })
                router.push({name:'DASHBOARD'})
            }).catch(err=>{
                authStore.$reset()
                router.push({name:'LOGIN'})
            })
        }else{
            authStore.$reset()
            router.push({name:'LOGIN'})
        }
    })

}