import {defineStore} from "pinia";
import {IServer_List} from "../utils/Types";
import {envVariable, useAuthStore,useDashboardStore} from "../composables/useStates";


export const Server=defineStore('server',{
    state:()=>{
        const {server_ip}=envVariable();
        return{
            server_ip:server_ip  as string,
            serversList:[] as IServer_List[],
            fetchServerListFlag:false as boolean
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
                },[server_ip])
            }else{
                return ['']
            }
        }
    },
    actions:{
        changeServerIP(newIP){
            this.server_ip=newIP
        },
        fetchServersList(){
            const {apiBase}=envVariable();
            const {token}=useAuthStore();
            const {dashboardStore}=useDashboardStore()
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
                    this.serversList=response
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