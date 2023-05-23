import {IUser_Data, IUser_Information} from "~/utils/Types";


export const useLogin=()=>{
    const usernameRegex=/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
    const loginRequestFlag=useState<boolean|null>('loginRequestFlag',()=>null)
    const {isLogin,userInformation}=useStates()
    const userData=reactive<IUser_Data>({
        username:'hooman_77',
        password:'123456H%ioo',
        rememberMe:false
    })

    const formHandler = async () => {
        if(userData.password.match(passwordRegex) && userData.username.match(usernameRegex)){
            loginRequestFlag.value=true
            try {
                const loginValidationRequest:IUser_Information=await $fetch('/api/login',{
                    method:'POST',body:userData
                })
                userInformation.value=loginValidationRequest
                isLogin.value=true
                return navigateTo({name:'DASHBOARD'})
            }catch (err) {
                isLogin.value=false
                console.log(err)
            }finally {
                loginRequestFlag.value=false
            }
        }
    }


    return{
        userData,formHandler,usernameRegex,passwordRegex,loginRequestFlag
    }
}