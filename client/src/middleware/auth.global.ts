
export default defineNuxtRouteMiddleware((to,from)=>{
    if(process.server)return
    if(process.client){
        const isLogin=useState<boolean>('isLogin')
        if(to.name!=='LOGIN' && !isLogin.value){
            return  navigateTo({name:'LOGIN'})
        }
    }
})