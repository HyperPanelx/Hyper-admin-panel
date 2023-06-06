import {defineStore} from "pinia";

export const Dashboard=defineStore('dashboard',{
    state:()=>{
        return{
            sidebarCollapseFlag:false as boolean,
            showPreloaderFlag:false as boolean
        }
    }
})