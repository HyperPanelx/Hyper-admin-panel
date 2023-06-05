import {IUser_Data} from "../utils/Types";
import {usernameRegex,passwordRegex,loginEncode} from "../utils/Helper";
import {ref, reactive,inject} from "vue";
import {VueCookies} from "vue-cookies";
import {envVariable,useAuthStore} from "./useStates";
import {useRouter} from "vue-router";

export const useLogin=()=>{
    const router=useRouter()
    const loginRequestFlag=ref<boolean|null>(null)
    const $cookies = inject<VueCookies>('$cookies');
    const {authStore}=useAuthStore();
    const {apiBase,cookieName}=envVariable();
    const errorMessage=ref<string>('')
    const userData=reactive<IUser_Data>({
        username:'hooman_77',
        password:'13777731Ho@',
        rememberMe:false
    })

    const formHandler = async () => {
        if(userData.password.match(passwordRegex) && userData.username.match(usernameRegex)){
            const requestOption=loginEncode(userData.username,userData.password)
            loginRequestFlag.value=true
            errorMessage.value=''
            fetch(apiBase+'token',{
                method:'POST',
                body:requestOption.body,
                headers:requestOption.header,
            }).then(response=>response.json()).then(response=>{
                if(userData.rememberMe){
                    $cookies?.set(cookieName as string,response.access_token,)
                }
                authStore.$patch({
                    username:userData.username,
                    isLogin:true
                })
                router.push({name:'DASHBOARD'})
            }).catch(err=>{
                authStore.$patch({
                    username:'',
                    isLogin:false
                })
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