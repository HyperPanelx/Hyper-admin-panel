import {ISidebar} from "~/utils/Types";

export const sidebarItemData:ISidebar[]=[
    {
        title:'Dashboard',
        icon:'humbleicons:home',
        link:{name:'DASHBOARD'},
        hasSub:false,
    },{
        title:'Users',
        icon:'humbleicons:users',
        link:{name:'USERS'},
        hasSub:false,

    },{
        title:'Online users',
        icon:'humbleicons:radio',
        link:{name:'ONLINE'},
        hasSub:false,

    },{
        title:'Settings',
        icon:'ri:settings-5-fill',
        link:{name:'SETTINGS'},
        hasSub:false,

    },
]


export const declareNumberToArray = (num:number) => {
    const res=[]
    for (let n=1;n<num+1;n++){
        res.push(n)
    }
    return res
}
