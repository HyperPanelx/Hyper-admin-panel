

export const useLogout=()=>{
    const logoutHandler = async () => {
      try {
          const logoutRequest=await $fetch('/api/logout')
          return navigateTo({name:'LOGIN'})
      }catch (err) {
          console.log(err)
      }
    }


    return{
        logoutHandler
    }
}