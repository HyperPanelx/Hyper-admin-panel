import { reset } from '@formkit/core'

export const useCreateUser=()=>{
    const {token}=useStates()
    const createSingleUserForm=ref(null)
    const {public:{apiKey,apiBase}}=useRuntimeConfig()

    const fetchOperationData=reactive({
        on:null as null|boolean,
        error:false,
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
        fetchOperationData.modal=false
        try {
            const createSingleUserRequest:{password:string,username:string}=await $fetch('/api/user/create',{
                body:value,
                credentials: "include",
                method:'POST',
                headers:{Authorization:apiKey,token:token.value},
                baseURL:apiBase
            })
            newCreatedUserData.password=createSingleUserRequest.password
            newCreatedUserData.username=createSingleUserRequest.username
            fetchOperationData.modal=true
            reset('createSingleUserForm')
        }catch (err) {
            console.log(err)
            fetchOperationData.error=true
        }finally {
            fetchOperationData.on=false
        }
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