

export const useLogout=()=>{
    const {isLogin}=useStates()
    const {public:{apiKey,apiBase}}=useRuntimeConfig()

    const logoutHandler = async () => {
      try {
          const logoutRequest=await $fetch('/api/auth/logout',{
              headers:{
                  Authorization:apiKey
              },
              credentials: "include",
              baseURL:apiBase
          })
          isLogin.value=false
          return navigateTo({name:'LOGIN'})
      }catch (err) {
          console.log(err)
      }
    }


    return{
        logoutHandler
    }
}