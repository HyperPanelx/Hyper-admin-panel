

export default defineNuxtPlugin(async nuxtApp=>{
    const isLogin=useState<boolean>('isLogin')
    const username=useState<string>('username')
    const {public:{apiKey,apiBase,cookieName}}=useRuntimeConfig();
    const token=useCookie(cookieName);
    if(token.value){
        try {
            const userInformation:string=await $fetch('/api/auth/me',{
                headers:{
                    Authorization:apiKey,
                    token:token.value
                },
                credentials: "include",
                baseURL:apiBase
            })
            username.value=userInformation
            isLogin.value=true
        }catch (err) {
            isLogin.value=false
        }
    }else{
        isLogin.value=false
    }

})