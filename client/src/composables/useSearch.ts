import {reactive} from "vue";
import {fakeSearchData} from "../utils/Data";

export const useSearch=(props:{modelValue:any},emit:any)=>{
    const searchData=reactive({
        searchContent:'' as string,
        searchResultFlag:false as boolean,
        searchResult:[] as any[]
    })


    const searchHandler = () => {
        emit('update:modelValue',searchData.searchContent.length > 0)
        searchData.searchResultFlag=false
        searchData.searchResult=[]
        if(searchData.searchContent.length>0){
            // fetch request here
            setTimeout(()=>{
                searchData.searchResultFlag=true
                searchData.searchResult=fakeSearchData
            },500)
        }
    }

    const closeResult = () => {
        searchData.searchContent=''
        emit('update:modelValue',false)
    }

    return{searchHandler,searchData,closeResult}
}