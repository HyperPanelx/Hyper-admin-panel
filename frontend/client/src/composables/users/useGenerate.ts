import {ref,reactive} from "vue";
import { reset } from '@formkit/core'
import {useAuthStore,envVariable} from "../useStates";
import { useNotification } from "@kyvg/vue3-notification";
import {downloadTextFile} from "../../utils/Helper";

export const useGenerate=()=>{
    const { notify }  = useNotification()
    const {token}=useAuthStore()
    const {apiBase,apiKey}=envVariable()
    const downloadAnchorElem=ref<HTMLAnchorElement|null>(null);
    const generateUserForm=ref<HTMLFormElement|null>(null);
    const generateUsersData=reactive({
        on:false as boolean,
        msg:'' as string,
        msgFlag:false as boolean,
        isDownloadAvailable:false as boolean,
        data:[] as any[],
        modalFlag:false
    })

    const downloadGeneratedDataHandler = () => {
        if(downloadAnchorElem.value && generateUsersData.data){
            const text:string=generateUsersData.data.map(item=> `username:${item.user}\npassword:${item.passwd}`).join('\n<------------->\n')
            downloadAnchorElem.value.setAttribute("href",     downloadTextFile(text)     );
            downloadAnchorElem.value.setAttribute("download", `generatedUser.txt`);
            downloadAnchorElem.value.click();
        }
    }

    const generateUserFormSubmit = (value) => {
        generateUsersData.on=true
        generateUsersData.msgFlag=false
        generateUsersData.msg=''
        generateUsersData.isDownloadAvailable=false
        generateUsersData.data=[]
        generateUsersData.modalFlag=false
        fetch(apiBase+'/user/generate',{
            method:'POST',
            body:JSON.stringify(value),
            headers:{
                'Content-Type':'application/json',
                Authorization:apiKey,
                token:token.value
            }
        }).
        then(response=>response.json()).
        then(response=>{
            if(response.error){
                /// if error in sending data
                generateUsersData.msg=response.error
            }else{
                notify({
                    type:'success',
                    title:'Generating User',
                    text:'User(s) generated successfully! you are able to download a json file.'
                })
                generateUsersData.isDownloadAvailable=true
                generateUsersData.data=response
                generateUsersData.modalFlag=value.g_count < 5
                reset('generateUserForm')
            }
        }).catch(err=>{
            console.log(err)
            generateUsersData.msg='Error in connecting to server! please try again.'
        }).finally(()=>{
            generateUsersData.on=false
            generateUsersData.msgFlag=true
        })
    }

    const castNumber = (node:any) => {
        node.hook.input((value:any, next:any) => next(Number(value)))
    };

    const submitForm = () => {
        if(generateUserForm.value){
            const node = (generateUserForm.value as any).node
            node.submit()
        }
    };


    return{
        castNumber,generateUserForm,submitForm,generateUserFormSubmit,generateUsersData,downloadGeneratedDataHandler,downloadAnchorElem
    }
}