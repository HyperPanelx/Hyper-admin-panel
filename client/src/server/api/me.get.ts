import {getCookie,sendError} from "h3";


export default defineEventHandler(async ev=>{
    const {cookieName,apiBase}=useRuntimeConfig()
    const cookie=getCookie(ev,cookieName);

    if(cookie){
        try {
            const getUserInformationRequest:{username:string}=await $fetch(apiBase+'panel/me/',{
                headers:{
                    'Content-type':'application/json',
                    Authorization:`Bearer ${cookie}`
                }
            })
            return getUserInformationRequest.username
        }catch (err) {
            sendError(ev,{
                name:'/api/me',
                message:'/api/me',
                statusMessage:'Error in connecting to api.',
                statusCode:401
            })
        }
    }else{
        sendError(ev,{
            name:'/api/me',
            message:'/api/me',
            statusMessage:'Invalid Cookie! need to relogin.',
            statusCode:400
        })
    }
})