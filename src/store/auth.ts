import {defineStore} from "pinia";


export const Auth=defineStore('auth',{
    state:()=>{
        return{
            username:'' as string,
            isLogin:false as boolean
        }
    }
})