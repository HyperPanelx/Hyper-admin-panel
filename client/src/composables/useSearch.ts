import {fakeSearchData} from "~/utils/Data";

export const useSearch=(props:{modelValue:any},emit:any)=>{
    const searchContent=useState<string>('searchContent',()=>'')
    const searchResultFlag=useState<boolean>('searchResultFlag',()=>false)
    const searchResult=useState<any[]>('searchResult',()=>[])

    const triggerSearch = () => {
        emit('update:modelValue',searchContent.value.length > 0)
        searchResultFlag.value=false
        searchResult.value=[]
        if(searchContent.value.length>0){
            // fetch request here
            setTimeout(()=>{
                searchResultFlag.value=true
                searchResult.value=fakeSearchData
            },500)
        }
    }


    return{
        searchContent,
        searchResultFlag,
        triggerSearch,searchResult
    }
}