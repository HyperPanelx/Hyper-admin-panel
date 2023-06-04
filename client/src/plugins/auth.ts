

export default defineNuxtPlugin(async nuxtApp=>{
    const isLogin=useState<boolean>('isLogin')
    const username=useState<string>('username')
    const {public:{apiKey,apiBase}}=useRuntimeConfig()
    try {
        const getUserAuthorizationInfo:string=await $fetch('/api/auth/me',{
            headers:{
                Authorization:apiKey
            },
            credentials: "include",
            baseURL:apiBase
        })
        username.value=getUserAuthorizationInfo
        isLogin.value=true
    }catch (err) {
        isLogin.value=false
    }
})