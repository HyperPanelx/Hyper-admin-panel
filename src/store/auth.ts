import {defineStore} from "pinia";


export const Auth=defineStore('auth',{
    state:()=>{
        return{
            username:'' as string,
            isLogin:true as boolean,
            token:'' as string
        }
    }
})