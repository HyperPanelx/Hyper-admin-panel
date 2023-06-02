import {IUser_Data} from "~/utils/Types";
import {usernameRegex,passwordRegex} from "~/utils/Helper";

export const useLogin=()=>{
    const loginRequestFlag=useState<boolean|null>('loginRequestFlag',()=>null)
    const {isLogin,username}=useStates()
    const {public:{internalApiKey}}=useRuntimeConfig();
    const errorMessage=useState<string>('loginErrorMessage',()=>'')
    const userData=reactive<IUser_Data>({
        username:'hooman_77',
        password:'13777731Ho@',
        rememberMe:false
    })

    const formHandler = async () => {
        if(userData.password.match(passwordRegex) && userData.username.match(usernameRegex)){
            loginRequestFlag.value=true
            errorMessage.value=''
            try {
                const loginValidationRequest=await $fetch('/api/login',{
                    method:'POST',
                    body:userData,
                    headers:{
                        Authorization:internalApiKey
                    }
                })
                username.value=userData.username
                isLogin.value=true
                return navigateTo({name:'DASHBOARD'})
            }catch (err) {
                isLogin.value=false
                username.value=''
                errorMessage.value='Error in connecting to server! please try again.'
                console.log(err)
            }finally {
                loginRequestFlag.value=false
            }
        }
    }


    return{
        userData,formHandler,usernameRegex,passwordRegex,loginRequestFlag,errorMessage
    }
}