import {defineStore} from "pinia";
import {IServer_List} from "../utils/Types";
import {envVariable, useAuthStore} from "../composables/useStates";
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
            if(state.fetchServerListFlag){
                return state.serversList.reduce((p1,p2)=>{
                    return [...p1,p2.host]
                },[])
            }else{
                return ['']
            }
        },
        isEnable:(state)=>(server:string)=>{
            const target=state.serversList.filter(item=>item.host===server)[0];
            return target.status === 'enable';
        }
    },
    actions:{
        changeServerIP(status:string,new_ip?:string|undefined){
            const { notify }  = useNotification()
            ///////////////////////////
            if(status==='enable'){
                this.server_ip=new_ip
                this.freezeAppFlag=true
                setTimeout(()=>{
                    this.freezeAppFlag=false
                    notify({
                        type:'success',
                        title:'Switch Server',
                        text:`server switched on ${this.server_ip} successfully!`
                    })
                },2000)
            }else{
                notify({
                    type:'error',
                    title:'Switch Server',
                    text:`server is disable!`
                })
            }
        },
        fetchServersList(){
            const {apiBase,server_ip}=envVariable();
            const {token}=useAuthStore();
            //////////////////////////////////////////////////
            this.fetchServerListFlag=false
            fetch(apiBase+'server-list',{
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
            })

        }
    }



})