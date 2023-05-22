import {IUser_Data} from "~/utils/Types";


export const useLogin=()=>{
    const usernameRegex=/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
    const loginRequestFlag=useState<boolean|null>('loginRequestFlag',()=>null)
    const userData=reactive<IUser_Data>({
        username:'hooman_77',
        password:'123456H%ioo',
        rememberMe:false
    })

    const formHandler = async () => {
        if(userData.password.match(passwordRegex) && userData.username.match(usernameRegex)){
            loginRequestFlag.value=true
            try {
                const loginValidationRequest=await $fetch('/api/login',{
                    method:'POST',body:userData
                })
                console.log(loginValidationRequest)
            }catch (err) {
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