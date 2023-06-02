import {IUser_Data} from "~/utils/Types";
import {loginEncode} from "~/utils/Helper";


export const useLogin=()=>{
    const usernameRegex=/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
    const loginRequestFlag=useState<boolean|null>('loginRequestFlag',()=>null)
    const errorMessage=useState<string>('loginErrorMessage',()=>'')
    const {isLogin,username}=useStates()
    const {public:{apiBase,cookieName}}=useRuntimeConfig()
    const userData=reactive<IUser_Data>({
        username:'hooman_77',
        password:'13777731Ho@',
        rememberMe:false
    })

    const formHandler = async () => {
        if(userData.password.match(passwordRegex) && userData.username.match(usernameRegex)){
            const fetchOptions=loginEncode(userData.username,userData.password)
            loginRequestFlag.value=true
            errorMessage.value=''
            try {
                const loginValidationRequest:{access_token:string}=await $fetch('token',{
                    method:'POST',
                    body:fetchOptions.body,
                    headers:fetchOptions.header,
                    baseURL:apiBase
                })
                if(userData.rememberMe){
                    useCookie(cookieName,{
                        secure:true,
                        maxAge:10*24*60*60,
                        path:'/',
                        priority:'high'
                    }).value=loginValidationRequest.access_token;
                }
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