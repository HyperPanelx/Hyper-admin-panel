

export const usePreloader=()=>{
    const showPreloaderFlag=useState('showPreloaderFlag',()=>false)
    const router=useRouter()
    router.beforeEach((to,from,next)=>{
        showPreloaderFlag.value=true
        if(process.client){
            document.body.style.overflow='hidden'
        }
        next()
    })

    router.beforeResolve((to,from,next)=>{
        showPreloaderFlag.value=false
        if(process.client){
            document.body.style.overflow='auto'
        }
        next()
    })

    return{
        showPreloaderFlag
    }
}