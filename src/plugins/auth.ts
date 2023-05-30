

export default defineNuxtPlugin(async nuxtApp=>{
    const isLogin=useState<boolean>('isLogin')
    const username=useState<string>('username')
    const {public:{internalApiKey}}=useRuntimeConfig()

    try {
        const getUserAuthorizationInfo:string=await $fetch('/api/me',{
            headers:{
                Authorization:internalApiKey
            }
        })
        username.value=getUserAuthorizationInfo
        isLogin.value=true
    }catch (err) {
        isLogin.value=false
    }
})