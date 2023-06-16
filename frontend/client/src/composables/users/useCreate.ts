import { reset } from '@formkit/core'
import {onMounted,reactive,ref} from "vue";
import {envVariable, useAuthStore} from "../useStates";
import {Response} from "../../utils/Types";

export const useCreateUser=()=>{
    const {token}=useAuthStore()
    const {apiBase,apiKey}=envVariable()
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
    const createUserFormSubmit = async (value:any) => {
        fetchOperationData.on=true
        fetchOperationData.error=false
        fetchOperationData.msg=''
        fetchOperationData.modal=false
        fetch(apiBase+'/user/create',{
            body:JSON.stringify(value),
            method:'POST',
            headers:{
                Authorization:apiKey,
                token:token.value,
                'Content-type':'application/json'
            },
        }).
        then(response=>response.json()).
        then((response:Response)=>{
            if(response.error){
                //// if username exist response=false
                fetchOperationData.msg=response.msg
                fetchOperationData.error=true
            }else{
                fetchOperationData.error=false
                newCreatedUserData.password=response.data.password
                newCreatedUserData.username=response.data.username
                fetchOperationData.modal=true
                reset('createSingleUserForm')
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