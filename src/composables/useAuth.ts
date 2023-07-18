import {inject, onMounted} from "vue";
import {VueCookies} from "vue-cookies";
import {envVariable} from "./useStates";
import {useRouter} from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";
import {authStore} from "../store/auth";


export const useAuth=()=>{
    const { notify }  = useNotification()
    /// .env
    const {apiBase,cookieName}=envVariable()
    /// router
    const router=useRouter()

    const $cookies = inject<VueCookies>('$cookies');
    onMounted(async ()=>{
        ///// check if user is valid or not
        const token=$cookies?.get(cookieName as string)
        if(token){
            fetch(apiBase+'panel/me/',{
                headers:{
                    'Content-type':'application/json',
                    Authorization:`Bearer ${token}`
                }
            }).
            then(response=>response.json()).
            then(response=>{
                if(response.detail){
                    //// if status 401 user is not valid
                    authStore.reset()
                    router.push({name:'LOGIN'})
                    notify({
                        title: "Authorization failed",
                        text: "You need to login again!",
                        type:'error'
                    });
                }else{
                    notify({
                        title: "Authorization successful!",
                        text: "You have been logged in!",
                        type:'success'
                    });
                    //// store username and token
                    /// islogin is for middleware
                    authStore.login(response.username,token)
                    router.push({name:'DASHBOARD'})
                }
            }).catch(err=>{
                //// if status 401 user is not valid
                authStore.reset()
                router.push({name:'LOGIN'})
                notify({
                    title: "Authorization failed",
                    text: "You need to login again!",
                    type:'error'
                });
            })
        }else{
            notify({
                title: "Authorization failed",
                text: "You need to login!",
                type:'error'
            });
            //// if there is no cookie user redirect to login  page
            authStore.reset()
            router.push({name:'LOGIN'})
        }
    })

}