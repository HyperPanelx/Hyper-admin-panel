import {IUser_Data} from "../utils/Types";
import {usernameRegex,passwordRegex} from "../utils/Helper";
import {ref, reactive,inject} from "vue";
import {VueCookies} from "vue-cookies";
import {envVariable,useAuthStore} from "./useStates";
import {useRouter} from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";

export const useLogin=()=>{
    const { notify }  = useNotification()
    const router=useRouter()
    const loginRequestFlag=ref<boolean|null>(null)
    const $cookies = inject<VueCookies>('$cookies');
    const {authStore}=useAuthStore();
    const {apiBase,cookieName,apiKey}=envVariable();
    const errorMessage=ref<string>('')
    const userData=reactive<IUser_Data>({
        username:'',
        password:'',
        rememberMe:false
    })

    const formHandler = async () => {
        //// validation using regex
        if(userData.password.match(passwordRegex) && userData.username.match(usernameRegex)){
            //// turn on button loader
            loginRequestFlag.value=true
            //// make empty error msg
            errorMessage.value=''
            fetch(apiBase+'/auth/login',{
                method:'POST',
                body:JSON.stringify(userData),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':apiKey as string
                },
            }).then(response=>response.json()).then((response:any)=>{
                if(response.detail){
                    /// if username or password is wrong
                    authStore.$reset()
                    errorMessage.value=response.detail +'!'
                }else{
                    notify({
                        title: "Authorization",
                        text: "You have been logged in!",
                        type:'success'
                    });
                    userData.rememberMe &&  $cookies?.set(cookieName as string,response)
                    authStore.$patch({
                        username:userData.username,
                        isLogin:true,
                        token:response
                    })
                    router.push({name:'DASHBOARD'})
                }
            }).catch(err=>{
                authStore.$reset()
                errorMessage.value='Error in connecting to server! please try again.'
                console.log(err)
            }).finally(()=>{
                loginRequestFlag.value=false
            })
        }
    }


    return{
        userData,formHandler,usernameRegex,passwordRegex,loginRequestFlag,errorMessage
    }
}