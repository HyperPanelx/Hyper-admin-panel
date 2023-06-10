import {useRoute,useRouter} from "vue-router";
import {onMounted, reactive,ref} from "vue";
import {envVariable,useAuthStore,useDashboardStore} from "../useStates";
import { useNotification } from "@kyvg/vue3-notification";


export const useEdit=()=>{
    const { notify }  = useNotification()
    const fetchFlag=ref<boolean>(false);
    const editFetchFlag=ref<boolean>(false);
    const editUserForm=ref<HTMLFormElement|null>(null);
    const route=useRoute();
    const router=useRouter();
    const {apiBase,apiKey}=envVariable();
    const {token}=useAuthStore();
    const {dashboardStore}=useDashboardStore();
    const userInitialData=reactive({
        username:'',
        telegram_id:'',
        phone:'',
        email:'',
        traffic:{
            num:0,
            unit:''
        }
    })

    onMounted(async ()=>{
        dashboardStore.showPreloaderFlag=true
        fetchFlag.value=false
       const username=route.query.username
        fetch(apiBase+`/user/detail?username=${username}`,{
            headers:{
                Authorization:apiKey,
                token:token.value,
                'Content-Type':'application/json'
            }
        }).then(response=>response.json()).then(response=>{
            const {username,telegram_id,phone,email,traffic:{num,unit}}=response;
            userInitialData.username=username
            userInitialData.telegram_id=telegram_id
            userInitialData.phone=phone
            userInitialData.email=email
            userInitialData.traffic.num=num
            userInitialData.traffic.unit=unit
            dashboardStore.showPreloaderFlag=false
            fetchFlag.value=true
        }).catch(err=>{
            console.log(err)
        })
    })

    const editUserFormSubmit =async (data) => {
        editFetchFlag.value=true
        fetch(apiBase+'/user/edit',{
            method:'PUT',
            headers:{
                Authorization:apiKey,
                token:token.value,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then(response=>response.json()).then(response=>{
            if(response.detail){
                notify({
                    type:'error',
                    title:'Edit User',
                    text:response.detail
                })
            }else{
                editFetchFlag.value=false
                notify({
                    type:'success',
                    title:'Edit User',
                    text:'users info edited successfully!'
                })
                router.push({name:'USERS'})
            }
        }).catch(err=>{
            notify({
                type:'error',
                title:'Edit User',
                text:'operation failed due to network connection!'
            })
        })
    }
    const submitForm = () => {
        if(editUserForm.value){
            const node = (editUserForm.value as any).node
            node.submit()
        }
    };


    return{
        fetchFlag,userInitialData,editUserForm,editUserFormSubmit,submitForm,editFetchFlag
    }
}