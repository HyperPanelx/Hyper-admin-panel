import {IUser_Information} from "~/utils/Types";

export const useStates=()=>{
    const sidebarCollapseFlag=useState<boolean>('sidebarCollapseFlag')
    const windowWidth:null|number=process.client ? window.innerWidth : null
    const isLogin=useState<boolean>('isLogin')
    const userInformation=useState<IUser_Information>('userInformation')

    return{
        sidebarCollapseFlag,windowWidth,isLogin,userInformation
    }
}