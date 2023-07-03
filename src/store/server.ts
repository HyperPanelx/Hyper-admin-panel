import {defineStore} from "pinia";
import {IServer_List} from "../utils/Types";
import {envVariable, useAuthStore,useDashboardStore} from "../composables/useStates";
import { useNotification } from "@kyvg/vue3-notification";


export const Server=defineStore('server',{
    state:()=>{
        const {server_ip}=envVariable();
        return{
            server_ip:server_ip  as string,
            serversList:[] as IServer_List[],
            fetchServerListFlag:false as boolean,
            freezeAppFlag:false as boolean
        }
    },
    getters:{
        getServerIP(state){
            return state.server_ip
        },
        getHostList(state):string[]{
            const {server_ip}=envVariable();
            if(state.fetchServerListFlag){
                return state.serversList.reduce((p1,p2)=>{
                    return [...p1,p2.host]
                },[])
            }else{
                return ['']
            }
        }
    },
    actions:{
        changeServerIP(){
            const { notify }  = useNotification()
            const {dashboardStore}=useDashboardStore()
            ///////////////////////////
            this.freezeAppFlag=true
            dashboardStore.showPreloaderFlag=true
            setTimeout(()=>{
                this.freezeAppFlag=false
                dashboardStore.showPreloaderFlag=false
                notify({
                    type:'success',
                    title:'Switch Server',
                    text:`server switched on ${this.server_ip} successfully!`
                })
            },2000)
        },
        fetchServersList(){
            const {apiBase,server_ip}=envVariable();
            const {token}=useAuthStore();
            const {dashboardStore}=useDashboardStore()
            //////////////////////////////////////////////////
            this.fetchServerListFlag=false
            dashboardStore.showPreloaderFlag=true
            fetch(apiBase+'list-servers',{
                headers:{
                    'Content-type':'application/json',
                    Authorization:`Bearer ${token.value}`
                }
            }).
            then(response=>response.json()).
            then(response=>{
                if(response.detail){
                    console.log(response)
                }else{
                    this.serversList=[
                        {
                            host:server_ip,
                            port:22,
                            status:'enable',
                        },
                        ...response
                    ]
                }
            }).catch(err=>{
                console.log(err)
            }).finally(()=>{
                this.fetchServerListFlag=true
                dashboardStore.showPreloaderFlag=false
            })

        }
    }



})