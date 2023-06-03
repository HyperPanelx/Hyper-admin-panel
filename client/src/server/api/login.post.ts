import {readBody, setCookie,sendError,sendNoContent} from "h3";
import {IUser_Data,Login_Response} from "~/utils/Types";
import {loginEncode} from "~/utils/Helper";

export default defineEventHandler(async ev=>{
    const body:IUser_Data=await readBody(ev)
    const {cookieName,apiBase}=useRuntimeConfig();
    const fetchOptions=loginEncode(body.username,body.password)
    try {
        const requestToken:Login_Response=await $fetch(apiBase+'token',{
            method:'POST',
            body:fetchOptions.body,
            headers:fetchOptions.header
        })
        if(body.rememberMe){
            setCookie(ev,cookieName,requestToken.access_token,{
                httpOnly:true,
                secure:true,
                maxAge:10*24*60*60,
                path:'/',
                priority:'high'
            })
        }
        sendNoContent(ev,200)
    }catch (err) {
        sendError(ev,{
            statusCode:401,
            statusMessage:'Error in connecting to api',
            message:'/api/login',
            name:'/api/login'
        })
    }

})