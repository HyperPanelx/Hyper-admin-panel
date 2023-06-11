import {defineStore} from "pinia";
import {IUsers_Data,IServer_Status} from "../utils/Types";
import {useLogout} from "../composables/useLogout";
import {envVariable, useAuthStore} from "../composables/useStates";



export const Dashboard=defineStore('dashboard',{
    state:()=>{
        return{
            sidebarCollapseFlag:false as boolean,
            showPreloaderFlag:false as boolean,
            fetchDashboardDataFlag:false as boolean,
            usersStatusData:[] as IUsers_Data[],
            serverStatus:{
                cpu:0,
                ram:0,
                disk:0,
                bandWidth:{
                    download:0,
                    upload:0,
                    downloadSpeed:0,
                    uploadSpeed:0,
                    speedUnit:''
                }
            } as IServer_Status
        }
    },
    actions:{
         async getServerUsageData (){
             ///.env
             const {apiKey,apiBase}=envVariable()
             /// logout func
             const {logoutHandler}=useLogout()
             /// token for auth header
             const {token}=useAuthStore()
             /// turn on loader flag
            this.fetchDashboardDataFlag=false
            fetch(apiBase+'/dashboard/server',{
                headers:{
                    Authorization:apiKey as string,
                    token:token.value as any,
                    'Content-Type':'application/json'
                },
            }).
            then(response=>response.json()).
            then((response:IServer_Status|boolean)=>{
                if(!response && typeof response==='boolean'){
                    ///// if token is not valid user must be logged out and response = false
                    logoutHandler()
                }else{
                    this.serverStatus=response as IServer_Status
                }
            }).catch(err=>{
                console.log(err)
            }).finally(()=>{
                // turn of loader flag
                this.fetchDashboardDataFlag=true
            })
        },
        async triggerInitialFetchData(){
            ///.env
            const {apiKey,apiBase}=envVariable()
            /// token for auth header
            const {token}=useAuthStore()
            /// turn on page loader flag
            this.showPreloaderFlag=true
            await this.getServerUsageData()
            await fetch(apiBase+'/dashboard/users-status',{
                headers:{
                    Authorization:apiKey as string,
                    token:token.value as any,
                    'Content-Type':'application/json'
                },
            }).
            then(response=>response.json()).
            then(response=>{
                this.usersStatusData=response
            }).
            catch(err=>console.log(err)).
            finally(()=>{
                /// turn off page loader flag
                this.showPreloaderFlag=false
            })

        }
    }
})