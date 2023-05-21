import {ISidebar} from "~/utils/Types";

export const sidebarItemData:ISidebar[]=[
    {
        title:'Dashboard',
        icon:'humbleicons:home',
        link:{name:'DASHBOARD'},
        hasSub:true,
        sub:[
            {
                title:'Sub menu 1',
                link:{name:'DASHBOARD'},
            },{
                title:'Sub menu 2',
                link:{name:'USERS'},
            },
        ]
    },{
        title:'Users',
        icon:'humbleicons:users',
        link:{name:'USERS'},
        hasSub:false,

    },{
        title:'Online users',
        icon:'humbleicons:radio',
        link:{name:'ONLINE_USERS'},
        hasSub:false,

    },{
        title:'Settings',
        icon:'ri:settings-5-fill',
        link:{name:'SETTINGS'},
        hasSub:false,

    },
]