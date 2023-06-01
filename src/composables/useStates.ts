import {IUsers_Data,IOnline_Users_Data} from "~/utils/Types";

export const useStates=()=>{
    const sidebarCollapseFlag=useState<boolean>('sidebarCollapseFlag')
    const windowWidth:null|number=process.client ? window.innerWidth : null
    const isLogin=useState<boolean>('isLogin')
    const username=useState<string>('username')
    const openNavbarDropdownFlag=ref<boolean>(false)
    const showPreloaderFlag=useState<boolean>('showPreloaderFlag')
    const tableData=useState<IUsers_Data|IOnline_Users_Data>('tableData');
    const fetchTableDataFlag=useState<boolean>('fetchTableDataFlag');
    const selectedUserToDelete=useState<string[]>('selectedUserToDelete')


    return{
        sidebarCollapseFlag,windowWidth,isLogin,username,openNavbarDropdownFlag,showPreloaderFlag,tableData, fetchTableDataFlag,selectedUserToDelete
    }
}