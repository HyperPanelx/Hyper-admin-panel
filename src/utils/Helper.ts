import {ISidebar} from "./Types";
export const usernameRegex=/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g
export const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
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


export const loginEncode = (username:string,password:string):{header:any,body:any} => {
    const myHeaders = new Headers();
    const urlencoded = new URLSearchParams();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    urlencoded.append("grant_type", "");
    urlencoded.append("scope", "");
    urlencoded.append("client_id", "");
    urlencoded.append("client_secret", "");
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    return {
        header:myHeaders,
        body:urlencoded
    }
}


export const stringToPassword=(str:string)=>{
    return str.split('').map(item=>'•').join('')
}

export const copyText = (txt:string) => {
    navigator.clipboard.writeText(txt);
    alert('copied')
}