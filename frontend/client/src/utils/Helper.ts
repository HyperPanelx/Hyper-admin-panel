import {ISidebar} from "./Types";
import { useNotification } from "@kyvg/vue3-notification";

export const usernameRegex=/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g
export const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
export const sidebarItemData:ISidebar[]=[
    {
        title:'Dashboard',
        icon:'fa-solid fa-house',
        link:{name:'DASHBOARD'},
        hasSub:false,
    },{
        title:'Users',
        icon:'fa-solid fa-user-group',
        link:{name:'USERS'},
        hasSub:false,

    },{
        title:'Online users',
        icon:'fa-solid fa-tower-broadcast',
        link:{name:'ONLINE'},
        hasSub:false,

    },{
        title:'Settings',
        icon:'fa-solid fa-gear',
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

export const copyText = async (txt:string) => {
    const { notify }  = useNotification()
    if(navigator.clipboard){
       await navigator.clipboard.writeText(txt);
        notify({
            type:'success',
            title:'Copied',
            duration:1
        })
    }else{
        notify({
            type:'error',
            title:'copy text is not allowed over http secure origin!',
            duration:2
        })
    }
}

export const querySerialize = (obj:object) => {
    return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
}

export const downloadTextFile = (txt:string) => {
    return "data:text/json;charset=utf-8," + encodeURI(txt);
}

export const downloadJsonFile = (json:string) => {
    return "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
}