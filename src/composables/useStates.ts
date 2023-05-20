

export const useStates=()=>{
    const sidebarCollapseFlag=useState<boolean>('sidebarCollapseFlag')
    const windowWidth:null|number=process.client ? window.innerWidth : null


    return{
        sidebarCollapseFlag,windowWidth
    }
}