import {IUser_Information} from "~/utils/Types";

export default defineNuxtPlugin(async nuxtApp=>{
    const isLogin=useState<boolean>('isLogin')
    const userInformation=useState<IUser_Information>('userInformation')
    const {public:{internalApiKey}}=useRuntimeConfig()

    try {
        const getUserAuthorizationInfo:IUser_Information=await $fetch('/api/me',{
            headers:{
                Authorization:internalApiKey
            }
        })
        userInformation.value=getUserAuthorizationInfo
        isLogin.value=true
    }catch (err) {
        isLogin.value=false
    }
})