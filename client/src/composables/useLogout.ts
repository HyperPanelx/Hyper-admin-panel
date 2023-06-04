

export const useLogout=()=>{
    const {isLogin}=useStates()
    const {public:{cookieName}}=useRuntimeConfig()

    const logoutHandler = async () => {
        useCookie(cookieName,{
            path:'/',
            maxAge:0
        }).value='';
        isLogin.value=false
        return navigateTo({name:'LOGIN'})
    }


    return{
        logoutHandler
    }
}