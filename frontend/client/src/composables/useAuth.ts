import {inject, onMounted} from "vue";
import {VueCookies} from "vue-cookies";
import {envVariable,useAuthStore} from "./useStates";
import {useRouter,useRoute} from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";



export const useAuth=()=>{
    const { notify }  = useNotification()
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
            then(response=>{
                if(response.error){
                    //// if status 401 user is not valid
                    authStore.$reset()
                    router.push({name:'LOGIN'})
                    notify({
                        title: "Authorization failed",
                        text: "You need to login again!",
                        type:'error'
                    });
                }else{
                    notify({
                        title: "Authorization",
                        text: "You have been logged in!",
                        type:'success'
                    });
                    //// store username and token
                    /// islogin is for middleware
                    authStore.$patch({
                        username:response.data.username,
                        isLogin:true,
                        token:token
                    });
                    router.push({name:'DASHBOARD'})
                }
            }).catch(err=>{
                //// if status 401 user is not valid
                authStore.$reset()
                router.push({name:'LOGIN'})
                notify({
                    title: "Authorization failed",
                    text: "You need to login again!",
                    type:'error'
                });
            })
        }else{
            notify({
                title: "Authorization",
                text: "You need to login again!",
                type:'error'
            });
            //// if there is no cookie user redirect to login  page
            authStore.$reset()
            router.push({name:'LOGIN'})
        }
    })

}