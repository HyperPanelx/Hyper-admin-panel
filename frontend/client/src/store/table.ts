import {defineStore} from "pinia";
import {IUsers_Data,IOnline_Users_Data,Response} from "../utils/Types";
import {envVariable, useAuthStore, useDashboardStore} from "../composables/useStates";



export const Table=defineStore('table',{
    state:()=>{
        return{
            tableData:{} as IUsers_Data|IOnline_Users_Data,
            fetchTableDataFlag:false as boolean,
            selectedUserToDelete:[] as string[],
            selectedOnlineUserToKill:[] as string[],
            paginationData:{} as any,
            searchText:'' as string
        }
    },
    actions:{
         async getUsersList (){
             //// dashboard store for preloader
             const {dashboardStore}=useDashboardStore()
             /// token / .env
             const {token}=useAuthStore()
             const {apiBase,apiKey}=envVariable()

             this.tableData={rows:[],titles:[]}
             this.fetchTableDataFlag=false
            dashboardStore.showPreloaderFlag=true
            fetch(apiBase+'/user/list',{
                headers:{Authorization:apiKey,token:token.value},
            }).
            then(response=>response.json()).
            then((response:Response)=>{
                if(response.error){
                    console.log(response.error)
                }else{
                    this.tableData=response.data
                }
            }).
            catch(err=>console.log(err)).
            finally(()=>{
                this.fetchTableDataFlag=true
                dashboardStore.showPreloaderFlag=false
            })
        },
        async getOnlineUsers ()  {
            //// dashboard store for preloader
            const {dashboardStore}=useDashboardStore()
            /// token / .env
            const {token}=useAuthStore()
            const {apiBase,apiKey}=envVariable()
            this.tableData={rows:[],titles:[]}
            this.fetchTableDataFlag=false
            dashboardStore.showPreloaderFlag=true
            fetch(apiBase+'/user/online-list',{
                headers:{Authorization:apiKey,token:token.value},
            }).
            then(response=>response.json()).
            then((response:Response)=>{
                if(response.error){
                    console.log(response.error)
                }else{
                    this.tableData=response.data
                }
            }).
            catch(err=>console.log(err)).
            finally(()=>{
                this.fetchTableDataFlag=true
                dashboardStore.showPreloaderFlag=false
            })
        }
    }
})