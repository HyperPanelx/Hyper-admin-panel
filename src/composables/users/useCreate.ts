import { reset } from '@formkit/core'
import {onMounted,shallowReactive,ref,shallowRef} from "vue";
import {envVariable, useAuthStore,useServerStore} from "../useStates";
import {querySerialize} from "../../utils/Helper";
import {IResponse} from "../../utils/Types";

export const useCreateUser=()=>{
    const {token,username}=useAuthStore()
    const {apiBase}=envVariable()
    const {getServerIP}=useServerStore()
    const createSingleUserForm=shallowRef(null);
    const fetchOperationData=shallowReactive({
        on:null as null|boolean,
        error:false,
        msg:'',
        modal:false
    })
    const newCreatedUserData=shallowReactive({
        username:'',
        password:''
    })

    onMounted(()=>reset('createSingleUserForm'));
    const submitForm = () => {
        if(createSingleUserForm.value){
            const node = (createSingleUserForm.value as any).node
            node.submit()
        }
    };

    const castNumber = (node:any) => {
        node.hook.input((value:any, next:any) => next(Number(value)))
    };
    const createUserFormSubmit =  (formData:any) => {
        fetchOperationData.on=true
        fetchOperationData.error=false
        fetchOperationData.msg=''
        fetchOperationData.modal=false
        const query=querySerialize({
            username:formData.username,
            multi:Number(formData.concurrent_user),
            exdate:formData.expiration_date,
            telegram_id:formData.telegram_id,
            phone:Number(formData.phone),
            email:formData?.email ?? '',
            referral:formData?.referral ?? '' ,
            desc:formData?.description ?? '',
            traffic:formData.traffic ? `${formData?.traffic ?? ''} ${formData?.traffic_unit ?? ''}` : '',
            server:getServerIP.value,
            created_by:username.value
        });
        fetch(apiBase+'user-add?'+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token.value}`
            },
        }).
        then(response=>response.json()).
        then((response:IResponse<any>)=>{
            if(response.success){
                if(response.data.username && response.data.password){
                    fetchOperationData.error=false
                    newCreatedUserData.password=response.data.password
                    newCreatedUserData.username=response.data.username
                    fetchOperationData.modal=true
                    reset('createSingleUserForm')
                }else{
                    //// if username exist response=false
                    fetchOperationData.msg='The Username already exist'
                    fetchOperationData.error=true
                }
            }else{
                //// if username exist response=false
                fetchOperationData.msg=response.message
                fetchOperationData.error=true
            }

        }).catch(err=>{
            console.log(err)
            fetchOperationData.msg='Error in connecting to server! please try again.'
            fetchOperationData.error=true
        }).finally(()=>{
            fetchOperationData.on=false
        })
    };


    const closeModal = () => {
      fetchOperationData.modal=false
    };


    return{
        createUserFormSubmit,fetchOperationData,createSingleUserForm,submitForm,castNumber,closeModal,newCreatedUserData
    }
}