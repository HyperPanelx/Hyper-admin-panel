import {defineStore} from "pinia";
import {IUsers_Data,IOnline_Users_Data} from "../utils/Types";
import {envVariable, useAuthStore, useDashboardStore} from "../composables/useStates";
import {dayRegex, monthRegex, yearRegex,date,currentDate,currentMonth,currentYear} from "../utils/Helper";


///////////////////////////////////////////////////////

export const Table=defineStore('table',{
    state:()=>{
        return{
            tableData:{} as IUsers_Data|IOnline_Users_Data,
            fetchTableDataFlag:false as boolean,
            selectedUserToDelete:[] as string[],
            selectedOnlineUserToKill:[] as string[],
            paginationData:{} as any,
            searchText:'' as string,
        }
    },
    actions:{
        trackExpiredUsers(usersData:IUsers_Data['rows']){
            const {dashboardStore}=useDashboardStore()
            ///////////////////////////////////////////
            usersData.forEach(user=>{
                const userExYear=Number(user.exdate?.match(yearRegex)[0]) ?? null
                const userExMonth=Number(user.exdate?.match(monthRegex)[0]) ?? null
                const userExDay=Number(user.exdate?.match(dayRegex)[0]) ?? null
                if(currentYear==userExYear && currentMonth==userExMonth){
                    if(currentDate+4 > userExDay){
                        dashboardStore.addNotification({
                            username:user.user,
                            msg:'Action require : user will be expired soon',
                            title:'User expiration',
                            status:'warning'
                        })
                    }
                }else if (currentYear==userExYear && currentMonth+1==userExMonth){
                    if(currentDate>28 && (userExDay<2 || userExDay>28)){
                        dashboardStore.addNotification({
                            title:'User expiration',
                            username:user.user,
                            msg:'Action require : user will be expired soon',
                            status:'warning'
                        })
                    }
                } else if(currentYear>userExYear || currentMonth> userExMonth){
                    dashboardStore.addNotification({
                        username:user.user,
                        msg:'Action require : user expired',
                        title:'User expiration',
                        status:'danger'
                    })
                }
           })
        },
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
                    };
                    this.trackExpiredUsers(response)

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