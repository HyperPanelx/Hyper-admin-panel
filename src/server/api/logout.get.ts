import {sendNoContent} from "h3";

export default defineEventHandler(async ev=>{
    const {cookieName}=useRuntimeConfig()
    setCookie(ev,cookieName,'',{
        path:'/',
        maxAge:new Date(0).getTime()
    })
    sendNoContent(ev,200)
})