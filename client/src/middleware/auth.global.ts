
export default defineNuxtRouteMiddleware((to,from)=>{
    const isLogin=useState<boolean>('isLogin')
    if(to.name!=='LOGIN' && !isLogin.value){
        return  navigateTo({name:'LOGIN'})
    }
})