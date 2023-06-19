import {defineStore} from "pinia";
import {IUsers_Data,IOnline_Users_Data} from "../utils/Types";
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
             const {apiBase}=envVariable()

             this.tableData={rows:[],titles:[]}
             this.fetchTableDataFlag=false
            dashboardStore.showPreloaderFlag=true
            fetch(apiBase+'get-users?mode=all',{
                headers:{
                    'Content-type':'application/json',
                    Authorization:`Bearer ${token.value}`
                }
            }).
            then(response=>response.json()).
            then((response)=>{
                if(response.detail){
                    console.log(response.detail)
                }else{
                    this.tableData={
                        titles:['user info','traffic','User limitation','Contact info','Date','status','operation'],
                        rows:response.map((item,index)=>{
                            return {...item,uid:index+1}
                        })
                    }
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
            const {apiBase}=envVariable()
            this.tableData={rows:[],titles:[]}
            this.fetchTableDataFlag=false
            dashboardStore.showPreloaderFlag=true
            fetch(apiBase+'active-user',{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token.value}`
                },
            }).
            then(response=>response.json()).
            then((response)=>{
                if(response.detail){
                    console.log(response.detail)
                }else{
                    this.tableData={
                        titles:['#','Username','IP Address','Management'],
                        rows:response.map((item,index)=>{
                            return {
                                user:item,
                                ip:'',
                                uid:index+1
                            }
                        })
                    }
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