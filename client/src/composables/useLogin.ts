import {IUser_Data} from "../utils/Types";
import {usernameRegex,passwordRegex} from "../utils/Helper";
import {ref, reactive,inject} from "vue";
import {VueCookies} from "vue-cookies";
import {envVariable,useAuthStore} from "./useStates";
import {useRouter} from "vue-router";


export const useLogin=()=>{
    const router=useRouter()
    const loginRequestFlag=ref<boolean|null>(null)
    const $cookies = inject<VueCookies>('$cookies');
    const {authStore}=useAuthStore();
    const {apiBase,cookieName,apiKey}=envVariable();
    const errorMessage=ref<string>('')
    const userData=reactive<IUser_Data>({
        username:'hooman_77',
        password:'13777731Ho@',
        rememberMe:false
    })

    const formHandler = async () => {
        if(userData.password.match(passwordRegex) && userData.username.match(usernameRegex)){
            loginRequestFlag.value=true
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
                    authStore.$reset()
                    errorMessage.value=response.detail +'!'
                }else{
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