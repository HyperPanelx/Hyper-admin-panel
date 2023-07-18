import {reactive} from "vue";
import {envVariable,useAuthStore} from "./useStates";
import {IResponse} from "../utils/Types";

export const useSearch=(props:{modelValue:any},emit:any)=>{
    const searchData=reactive({
        searchContent:'' as string,
        searchResultFlag:false as boolean,
        searchResult:[] as any[]
    });
    const {apiBase}=envVariable();
    const {token}=useAuthStore();

    const searchHandler = () => {
        emit('update:modelValue',searchData.searchContent.length > 0)
        searchData.searchResultFlag=false
        searchData.searchResult=[]
        if(searchData.searchContent.length>0){
            fetch(apiBase+`user-search?username=${searchData.searchContent}`,{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token.value}`
                },
            }).then(response=>response.json()).
            then((response:IResponse<string[]>)=>{
                if(response.success){
                    searchData.searchResultFlag=true
                    searchData.searchResult=response.data
                }else{
                    console.log(response)
                }
            })
        }
    }

    const closeResult = () => {
        searchData.searchContent=''
        emit('update:modelValue',false)
    }

    return{searchHandler,searchData,closeResult}
}