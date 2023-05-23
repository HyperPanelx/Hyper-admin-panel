import {RouteLocationRaw} from "vue-router";

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

export interface IUser_Information {
    firstname:string,
    lastname:string
}