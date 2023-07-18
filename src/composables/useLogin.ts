import {IUser_Data} from "../utils/Types";
import {usernameRegex,passwordRegex,bodyEncode} from "../utils/Helper";
import {ref, reactive,inject} from "vue";
import {VueCookies} from "vue-cookies";
import {envVariable} from "./useStates";
import {useRouter} from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";
import {authStore} from "../store/auth";

export const useLogin=()=>{
    const { notify }  = useNotification()
    const router=useRouter()
    const loginRequestFlag=ref<boolean|null>(null);
    const $cookies = inject<VueCookies>('$cookies');
    const {apiBase,cookieName}=envVariable();
    const errorMessage=ref<string>('');
    const userData=reactive<IUser_Data>({
        username:'',
        password:'',
        rememberMe:false
    })

    const formHandler =  () => {
        //// validation using regex
        if(userData.password.match(passwordRegex) && userData.username.match(usernameRegex)){
            //// turn on button loader
            loginRequestFlag.value=true
            //// make empty error msg
            errorMessage.value=''
            fetch(apiBase+'token',{
                method:'POST',
                body:bodyEncode(userData.username,userData.password),
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
            }).then(response=>response.json()).then((response)=>{
                if(response.detail){
                    /// if username or password is wrong
                    authStore.reset()
                    errorMessage.value=response.detail
                }else{
                    notify({
                        title: "Authorization",
                        text: "You have been logged in!",
                        type:'success'
                    });
                    userData.rememberMe &&  $cookies?.set(cookieName as string,response.access_token);
                    authStore.login(userData.username,response.access_token)
                    router.push({name:'DASHBOARD'})
                }
            }).catch(err=>{
                authStore.reset()
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