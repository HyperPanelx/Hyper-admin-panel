import {getCookie, readBody,sendNoContent} from "h3";



export default defineEventHandler(async ev=>{
    const body:{username:string}=await readBody(ev);
    const {apiBase,cookieName}=useRuntimeConfig();
    const cookie=getCookie(ev,cookieName);
    try {
        const deleteUserRequest=await $fetch(apiBase+'delete-user',{
            query:{username:body.username},
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${cookie}`
            },
        })
        sendNoContent(ev,200)
    }catch (err) {
        sendNoContent(ev,401)
    }
})