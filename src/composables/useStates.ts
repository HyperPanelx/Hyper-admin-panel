

export const useStates=()=>{
    const sidebarCollapseFlag=useState<boolean>('sidebarCollapseFlag')


    return{
        sidebarCollapseFlag
    }
}