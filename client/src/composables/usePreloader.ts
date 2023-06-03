

export const usePreloader=()=>{
    const showPreloaderFlag=useState('showPreloaderFlag',()=>false)
    const router=useRouter()
    router.beforeEach((to,from,next)=>{
        showPreloaderFlag.value=true
        next()
    })

    router.beforeResolve((to,from,next)=>{
        showPreloaderFlag.value=false
        next()
    })

    return{
        showPreloaderFlag
    }
}