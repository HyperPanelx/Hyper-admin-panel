import {readBody} from "h3";
import {IUser_Data} from "~/utils/Types";

export default defineEventHandler(async ev=>{
    const body:IUser_Data=await readBody(ev)
    console.log(body)
    return 'login'

})