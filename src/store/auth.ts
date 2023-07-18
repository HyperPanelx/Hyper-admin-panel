import {reactive} from "vue";



export const authStore=reactive({
    username:'' as string,
    isLogin:false as boolean,
    token:'' as string,
    reset(){
        this.username=''
        this.isLogin=false
        this.token=''
    },
    login(username:string,token:string){
        this.isLogin=true
        this.username=username
        this.token=token
    }

})