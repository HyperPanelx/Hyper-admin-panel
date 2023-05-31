import {getCookie, sendNoContent} from "h3";


export default defineEventHandler(async ev=>{
    const {apiBase,cookieName}=useRuntimeConfig();
    const cookie=getCookie(ev,cookieName);
    try {
        const activeUsersListRequest:any=await $fetch(apiBase+'active-user',{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${cookie}`
            },
        })

        return {
            titles:['#','Username','IP Address','Management'],
            rows:activeUsersListRequest.slice(1,activeUsersListRequest.length-1).split(',').map((item:any,index:number)=>{
                return {
                    user:item.trim().slice(1,item.trim().length-1),
                    ip:'',
                    uid:index+1
                }
            })
        }
    }catch (err) {
        console.log(err)
        sendNoContent(ev,401)
    }




})