import { reset } from '@formkit/core'
import {onMounted,reactive,ref} from "vue";
import {envVariable, useAuthStore,useServerStore} from "../useStates";
import {querySerialize} from "../../utils/Helper";

export const useCreateUser=()=>{
    const {token,username}=useAuthStore()
    const {apiBase}=envVariable()
    const {getServerIP}=useServerStore()
    const createSingleUserForm=ref(null);
    const fetchOperationData=reactive({
        on:null as null|boolean,
        error:false,
        msg:'',
        modal:false
    })
    const newCreatedUserData=reactive({
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
    const createUserFormSubmit = async (formData:any) => {
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
        fetch(apiBase+'add-user?'+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token.value}`
            },
        }).
        then(response=>response.json()).
        then((response)=>{
            if(response.username && response.password){
                fetchOperationData.error=false
                newCreatedUserData.password=response.password
                newCreatedUserData.username=response.username
                fetchOperationData.modal=true
                reset('createSingleUserForm')

            }else{
                //// if username exist response=false
                fetchOperationData.msg='The Username already exist'
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

    const copyCreatedUserInfo = () => {
        navigator.clipboard.writeText(`username:${newCreatedUserData.username} password:${newCreatedUserData.password}`)
        alert('copied the text')
    };

    return{
        createUserFormSubmit,fetchOperationData,createSingleUserForm,submitForm,castNumber,closeModal,newCreatedUserData,copyCreatedUserInfo
    }
}