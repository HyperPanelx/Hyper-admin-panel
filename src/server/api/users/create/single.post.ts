import {readBody,sendNoContent} from "h3";

// @ts-ignore
export default defineEventHandler(async ev=>{
    const body=await readBody(ev)
    console.log(body)

    if(true){
        sendNoContent(ev,200)
    }else{
        sendNoContent(ev,401)
    }

})