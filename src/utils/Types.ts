import {RouteLocationRaw} from "vue-router";

export interface Login_Response {
    access_token:string,
    token_type:'bearer'
}

export interface Response {
    error:boolean,
    msg:string|null,
    data:any|null
}
export interface ISidebar {
    title:string
    icon:string
    link:RouteLocationRaw
    hasSub:boolean,
    sub?:{
        title:string,
        link:RouteLocationRaw
    }[]
}

export interface IUser_Data {
    username:string,
    password:string
    rememberMe:boolean
}



export interface IUsers_Data {
    title:string
    number:number
    theme:string
}

export interface IServer_Status {
    cpu:number
    ram:number
    disk:number
    bandWidth:{
        download:number
        upload:number,
        downloadSpeed:number,
        speedUnit:string,
        uploadSpeed:number,
    }
}
export interface IUser_Item {
    desc: string
    email: string
    exdate: string
    multi: number
    passwd: string
    phone: number
    referral: string
    status: string
    telegram_id: string
    traffic: string
    user: string
}

export interface IUsers_Data {
    titles:string[],
    rows:IUser_Item[];

}

export interface IOnline_Users_Data{
    titles:string[],
    rows:{
      user:string,
      uid:number,
      ip:string
    }[]
}
export interface ICreate_User {
    username:string,
    password?:string,
    email?:string,
    phone:string,
    concurrent_user:number,
    expiration_date:string,
    traffic?:string,
    traffic_unit?:string,
    referral?:string,
    telegram_id:string,
    description?:string
}


export interface INotification {
    title:string,
    msg:string,
    username?:string,
    status:'warning' | 'news' | 'danger'
}