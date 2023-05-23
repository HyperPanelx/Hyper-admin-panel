

export const useLogout=()=>{
    const {isLogin}=useStates()

    const logoutHandler = async () => {
      try {
          const logoutRequest=await $fetch('/api/logout')
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