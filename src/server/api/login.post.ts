import {readBody, setCookie,sendError} from "h3";
import {IUser_Data} from "~/utils/Types";

export default defineEventHandler(async ev=>{
    const body:IUser_Data=await readBody(ev)
    const {cookieName}=useRuntimeConfig()

    try {
        if(body.rememberMe){
            setCookie(ev,cookieName,'COOKIE_TEST',{
                httpOnly:true,
                secure:true,
                maxAge:10*24*60*60,
                path:'/',
                priority:'high'
            })
        }
        return {
            firstname: 'hooman',
            lastname: 'mousavi'
        }
    }catch (err) {
        sendError(ev,{
            statusCode:401,
            statusMessage:'Error in connecting to api',
            message:'/api/login',
            name:'/api/login'
        })
    }

})