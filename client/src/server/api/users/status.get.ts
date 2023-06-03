import {IUsers_Data} from "~/utils/Types";

export default defineEventHandler(async ev=>{
    return [
        {
            title:'All Users',
            number:20,
            theme:'indigo'
        },{
            title:'Active Users',
            number:65,
            theme:'green'
        },{
            title:'Online Users',
            number:40,
            theme:'blue'
        },{
            title:'Blocked Users',
            number:20,
            theme:'red'
        },
    ] as IUsers_Data[]




})