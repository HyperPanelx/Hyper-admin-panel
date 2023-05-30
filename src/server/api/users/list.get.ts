import {getCookie, sendError} from "h3";
import {IUsers_Data} from "~/utils/Types";

export default defineEventHandler(async ev=>{
    const {cookieName,apiBase}=useRuntimeConfig()
    const cookie=getCookie(ev,cookieName);
    try {
        const getUsersListRequest:any[]=await $fetch(apiBase+'get-users',{
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${cookie}`
            }
        })
        return  {
            titles:['user info','traffic','User limitation','Contact info','Date','status','operation'],
            rows:getUsersListRequest
        }as IUsers_Data
    }catch (err) {
        sendError(ev,{
            statusCode:401,
            statusMessage:'Error in connecting to api',
            message:'/api/list',
            name:'/api/list'
        })
    }

})