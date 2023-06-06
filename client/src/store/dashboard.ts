import {defineStore} from "pinia";
import {fakeSearchData} from "../utils/Data";

export const Dashboard=defineStore('dashboard',{
    state:()=>{
        return{
            sidebarCollapseFlag:false as boolean,
            openNavbarDropdownFlag:false as boolean,
            searchContent:'' as string,
            searchResultFlag:false as boolean,
            searchResult:[ ] as any[]
        }
    },
    actions:{
        triggerSearch(){
            this.searchResultFlag=false
            this.searchResult=[]
            if(this.searchContent.length>0){
                // fetch request here
                setTimeout(()=>{
                    this.searchResultFlag=true
                    this.searchResult=fakeSearchData
                },500)
            }
        }
    }
})