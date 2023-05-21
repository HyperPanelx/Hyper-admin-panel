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