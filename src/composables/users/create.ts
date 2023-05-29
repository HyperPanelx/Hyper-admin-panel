import { reset } from '@formkit/core'

export const useCreateUser=()=>{
    const createSingleUserFetchFlag=useState<boolean|null>('createSingleUserFetchFlag',()=>null)
    const responseMessage=ref<string>('')
    const createSingleUserForm=ref(null)
    const {public:{internalApiKey}}=useRuntimeConfig()

    const submitForm = () => {
        if(createSingleUserForm.value){
            const node = (createSingleUserForm.value as any).node
            node.submit()
        }

    }
    
    const createUserFormSubmit = async (value:any) => {
        createSingleUserFetchFlag.value=true
        responseMessage.value=''
        try {
            const createSingleUserRequest=await $fetch('/api/users/create',{
                body:value,
                method:'POST',
                headers:{
                    Authorization:internalApiKey
                }
            })
            console.log(createSingleUserRequest)
            responseMessage.value='User created successfully!'
            reset('createSingleUserForm')
        }catch (err) {
            console.log(err)
            responseMessage.value='Error in connecting to server! please try again and check your connection.'
        }finally {
            createSingleUserFetchFlag.value=false
        }
    }



    return{
        createUserFormSubmit,createSingleUserFetchFlag,responseMessage,createSingleUserForm,submitForm
    }
}