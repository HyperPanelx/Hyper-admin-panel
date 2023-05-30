import {RouteLocationRaw} from "vue-router";

export interface Login_Response {
    access_token:string,
    token_type:'bearer'
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
        upload:number
    }
}

export interface ITable_Data {
    titles:string[],
    rows:{
        uid:string|number,
        username:string,
        password:string,
        traffic:string,
        usedVolume:number,
        userLimitation:number,
        contactInfo:{
            phone:string,
            email:string
        },
        date:{
            registered:string,
            expired:string
        },
        status:'active'|'inactive'|'Traffic completion'
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