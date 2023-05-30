
export const useStates=()=>{
    const sidebarCollapseFlag=useState<boolean>('sidebarCollapseFlag')
    const windowWidth:null|number=process.client ? window.innerWidth : null
    const isLogin=useState<boolean>('isLogin')
    const username=useState<string>('username')
    const openNavbarDropdownFlag=ref<boolean>(false)
    const showPreloaderFlag=useState('showPreloaderFlag')

    return{
        sidebarCollapseFlag,windowWidth,isLogin,username,openNavbarDropdownFlag,showPreloaderFlag
    }
}