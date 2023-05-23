import {fakeSearchData} from "~/utils/Data";

export const useSearch=()=>{
    const searchContent=useState<string>('searchContent',()=>'')
    const openDropdownFlag=useState<boolean>('openDropdownFlag',()=>false)
    const searchResultFlag=useState<boolean>('searchResultFlag',()=>false)
    const searchResult=useState<any[]>('searchResult',()=>[])

    const triggerSearch = () => {
        openDropdownFlag.value = searchContent.value.length > 0;
        searchResultFlag.value=false
        searchResult.value=[]
        if(process.client && searchContent.value.length>0){
            // fetch request here
            setTimeout(()=>{
                searchResultFlag.value=true
                searchResult.value=fakeSearchData
            },500)
        }
    }


    return{
        searchContent,
        openDropdownFlag,
        searchResultFlag,
        triggerSearch,searchResult
    }
}