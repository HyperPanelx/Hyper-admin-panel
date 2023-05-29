

export const useLogout=()=>{
    const {isLogin}=useStates()
    const {public:{internalApiKey}}=useRuntimeConfig()

    const logoutHandler = async () => {
      try {
          const logoutRequest=await $fetch('/api/logout',{
              headers:{
                  Authorization:internalApiKey
              }
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