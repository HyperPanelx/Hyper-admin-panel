import {defineStore} from "pinia";
import {IUsers_Data, IOnline_Users_Data, INotification, IUser_Item, IResponse} from "../utils/Types";
import {envVariable, useAuthStore,useServerStore} from "../composables/useStates";
import {dayRegex, monthRegex, yearRegex,date,currentDate,currentMonth,currentYear} from "../utils/Helper";
import {notificationStore} from './notification'
import {dashboardStore} from './dashboard'
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
    getters:{
        filterUser:(state)=>(source:INotification[])=>{
            let result=[]
            source.forEach((item)=>{
                const target=(state.tableData as IUsers_Data).rows.filter((table:IUser_Item)=>table.user===item.username)[0]
                result.push(target)
            })
            return result
        }
    },
    actions:{
        trackExpiredUsers(usersData:IUsers_Data['rows']){
            notificationStore.resetNotifications()
            ///////////////////////////////////////////
            usersData.forEach(user=>{
                const userExYear=Number(user.exdate?.match(yearRegex)[0]) ?? null
                const userExMonth=Number(user.exdate?.match(monthRegex)[0]) ?? null
                const userExDay=Number(user.exdate?.match(dayRegex)[0]) ?? null
                if(currentYear==userExYear && currentMonth==userExMonth){
                    if(currentDate+4 > userExDay && currentDate<userExDay){
                        notificationStore.addNotification({
                            username:user.user,
                            msg:'Action require : user will be expired soon',
                            title:'User expiration',
                            status:'warning'
                        })
                    }else if(currentDate>userExDay){
                        notificationStore.addNotification({
                            username:user.user,
                            msg:'Action require : user expired',
                            title:'User expiration',
                            status:'danger'
                        })
                    }

                }else if (currentYear==userExYear && currentMonth+1==userExMonth){
                    if(currentDate>28 && (userExDay<2 || userExDay>28)){
                        notificationStore.addNotification({
                            title:'User expiration',
                            username:user.user,
                            msg:'Action require : user will be expired soon',
                            status:'warning'
                        })
                    }
                    //// 2023 > 2022
                } else if(currentYear>userExYear){
                    notificationStore.addNotification({
                        username:user.user,
                        msg:'Action require : user expired',
                        title:'User expiration',
                        status:'danger'
                    })
                    /// 2023=2023  // 7>6 => expire
                }else if(currentYear==userExYear && currentMonth> userExMonth){
                    notificationStore.addNotification({
                        username:user.user,
                        msg:'Action require : user expired',
                        title:'User expiration',
                        status:'danger'
                    })
                    /// 2023=2023 7=7 20>18 => expire
                }


           })
        },
         async getUsersList (){
            //// server store
             const {getServerIP}=useServerStore()
             /// token / .env
             const {token}=useAuthStore()
             const {apiBase,server_ip}=envVariable()

             this.tableData={rows:[],titles:[]}
             this.fetchTableDataFlag=false
            dashboardStore.showPreloaderFlag=true
            fetch(apiBase+`user-get?username=all&server=${getServerIP.value}`,{
                headers:{
                    'Content-type':'application/json',
                    Authorization:`Bearer ${token.value}`
                }
            }).
            then(response=>response.json()).
            then((response:IResponse<IUsers_Data>)=>{
                if(response.success){
                    this.tableData={
                        titles:['user info','traffic','User limitation','Contact info','Detail','status','operation'],
                        rows:response.data.map((item,index)=>{
                            return {...item,uid:index+1,server:item.server || server_ip,ordered_by:item.ordered_by || 'god'}
                        })
                    };
                    this.trackExpiredUsers(response.data)
                    this.fetchTableDataFlag=true
                    dashboardStore.showPreloaderFlag=false

                }else{
                    console.log(response)
                }
            }).
            catch(err=>{
                console.log(err)
                dashboardStore.showPreloaderFlag=false

            });
        },
        async getOnlineUsers ()  {
            //// server store
            const {getServerIP}=useServerStore()
            /// token / .env
            const {token}=useAuthStore()
            const {apiBase}=envVariable()
            this.tableData={rows:[],titles:[]}
            this.fetchTableDataFlag=false
            dashboardStore.showPreloaderFlag=true
            fetch(apiBase+`user-active?server=${getServerIP.value}`,{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token.value}`
                },
            }).
            then(response=>response.json()).
            then((response)=>{
                if(response.users){
                    this.tableData={
                        titles:['#','Username','IP Address','Management'],
                        rows:response.users.map((item,index)=>{
                            return {
                                user:item,
                                ip:'',
                                uid:index+1
                            }
                        })
                    }
                    this.fetchTableDataFlag=true
                    dashboardStore.showPreloaderFlag=false
                }else{
                    console.log(response)
                }
            }).
            catch(err=>{
                console.log(err)
                dashboardStore.showPreloaderFlag=false
            });
        }
    }
})