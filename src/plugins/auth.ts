import {IUser_Information} from "~/utils/Types";

export default defineNuxtPlugin(async nuxtApp=>{
    const isLogin=useState<boolean>('isLogin')
    const userInformation=useState<IUser_Information>('userInformation')
    try {
        const getUserAuthorizationInfo:IUser_Information=await $fetch('/api/me')
        userInformation.value=getUserAuthorizationInfo
        isLogin.value=true
    }catch (err) {
        isLogin.value=false
    }
})