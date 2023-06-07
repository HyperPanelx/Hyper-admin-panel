import {inject, onMounted} from "vue";
import {VueCookies} from "vue-cookies";
import {envVariable,useAuthStore} from "./useStates";
import {useRouter,useRoute} from "vue-router";



export const useAuth=()=>{
    /// .env
    const {apiBase,cookieName,apiKey}=envVariable()
    /// router
    const router=useRouter()
    const route=useRoute()

    /// authentication store
    const {authStore}=useAuthStore()
    const $cookies = inject<VueCookies>('$cookies');
    onMounted(async ()=>{
        ///// check if user is valid or not
        const token=$cookies?.get(cookieName as string)
        if(token){
            fetch(apiBase+'/auth/me',{
                headers:{
                    Authorization:apiKey as string,
                    token:token,
                    'Content-type':'application/json'
                },
            }).
            then(response=>response.json()).
            then(username=>{
                //// store username and token
                /// islogin is for middleware
                authStore.$patch({
                    username:username,
                    isLogin:true,
                    token:token
                })
                router.push({name:'DASHBOARD'})
            }).catch(err=>{
                //// if status 401 user is not valid
                authStore.$reset()
                router.push({name:'LOGIN'})
            })
        }else{
            //// if there is no cookie user redirect to login  page
            authStore.$reset()
            router.push({name:'LOGIN'})
        }
    })

}