import {getCookie,getQuery,sendNoContent} from "h3";


export default defineEventHandler(async (ev:any)=> {
    const {apiBase,cookieName}=useRuntimeConfig();
    const query=await getQuery(ev)
    const cookie=getCookie(ev,cookieName);
    if(query.username){
        sendNoContent(ev,200)
    }else{
        sendNoContent(ev,401)
    }
})