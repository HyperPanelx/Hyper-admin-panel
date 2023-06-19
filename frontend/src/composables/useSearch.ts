import {reactive} from "vue";
import {envVariable,useAuthStore} from "./useStates";

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
            fetch(apiBase+`search-user?username=${searchData.searchContent}`,{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token.value}`
                },
            }).then(response=>response.json()).
            then((response)=>{
                if(response.detail){
                    console.log(response.detail)
                }else{
                    searchData.searchResultFlag=true
                    searchData.searchResult=response
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