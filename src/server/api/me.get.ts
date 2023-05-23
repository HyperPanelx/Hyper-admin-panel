import {getCookie,sendError} from "h3";


export default defineEventHandler(async ev=>{
    const {cookieName}=useRuntimeConfig()
    const cookie=getCookie(ev,cookieName)
    if(cookie){
        try {
            return {
                firstname: 'hooman',
                lastname: 'mousavi'
            }
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