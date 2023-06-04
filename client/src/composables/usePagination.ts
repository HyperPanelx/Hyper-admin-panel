import {IUsers_Data} from "~/utils/Types";


export const usePagination=()=>{
    const {token,tableData,fetchTableDataFlag,selectedUserToDelete,showPreloaderFlag,selectedOnlineUserToKill}=useStates();
    const {public:{apiBase,apiKey}}=useRuntimeConfig()
    const searchText=useState('tableSearchText',()=>'');
    const modalData=reactive({
        on:false,
        name:''
    })
    const paginationDataInitialValue={
        itemPerPage:5,
        allPages:0,
        sourceData:[] as IUsers_Data['rows'],
        currentPageData:[] as IUsers_Data['rows'],
        startIdx:0,
        endIdx:0,
        currentPage:1,
        searchResultFlag:false,
        maxShowButton:3,
        startShowPaginationButton:1,
        endShowPaginationButton:3,
    }
    const paginationData=useState<any>('paginationData',()=>paginationDataInitialValue)

    const changePerPageHandler = (value:any) => {
        paginationData.value.itemPerPage=value.per_page
        paginationUpdate()
    }

    const paginationUpdate = () => {
        paginationData.value.allPages=Math.ceil(paginationData.value.sourceData.length/paginationData.value.itemPerPage);
        paginationData.value.currentPageData=[...paginationData.value.sourceData].slice(0,paginationData.value.itemPerPage)
    }

    const changePage = (pageNumber:number) => {
        if(pageNumber> paginationData.value.allPages){
            paginationData.value.currentPage=1
        }else if(pageNumber<1){
            paginationData.value.currentPage=paginationData.value.allPages
        }else{
            paginationData.value.currentPage=pageNumber
        }
        paginationData.value.endIdx=paginationData.value.currentPage*paginationData.value.itemPerPage
        paginationData.value.startIdx=paginationData.value.endIdx-paginationData.value.itemPerPage
        paginationData.value.currentPageData=[...paginationData.value.sourceData].slice(paginationData.value.startIdx,paginationData.value.endIdx)

    }
    const nextPage = () => {
      changePage(paginationData.value.currentPage+1)
        goToCurrentButton(paginationData.value.currentPage)
    }
    const previousPage = () => {
        changePage(paginationData.value.currentPage-1)
        goToCurrentButton(paginationData.value.currentPage)
    }


    watch(
        ()=>fetchTableDataFlag.value,
        ()=>{
            if(fetchTableDataFlag.value){
                paginationData.value=null
                selectedUserToDelete.value=[]
                selectedOnlineUserToKill.value=[]
                paginationData.value=paginationDataInitialValue
                paginationData.value.sourceData=tableData.value.rows
                paginationUpdate()
            }
        },
        {
            immediate:true
        }
    )

    const searchHandler = () => {
        paginationData.value.sourceData=tableData.value.rows
        const searchResult=[...paginationData.value.sourceData].filter(item=>{
            return item.user.toLowerCase().startsWith(searchText.value.toLowerCase())
        });
        paginationData.value.sourceData=searchResult
        paginationData.value.searchResultFlag = searchResult.length === 0;
        paginationUpdate()
    }

    const resetSearch = () => {
        paginationData.value.sourceData=tableData.value.rows
        searchText.value=''
        paginationUpdate()
        paginationData.value.searchResultFlag=false
    }
    const showMoreButton = () => {
      paginationData.value.startShowPaginationButton+=paginationData.value.maxShowButton
      paginationData.value.endShowPaginationButton+=paginationData.value.maxShowButton
    }
    const showLessButton = () => {
        paginationData.value.startShowPaginationButton-=paginationData.value.maxShowButton
        paginationData.value.endShowPaginationButton-=paginationData.value.maxShowButton
    }

    const goToCurrentButton = (currentPage:number) => {
        const allButtonPage=Math.ceil(paginationData.value.allPages/paginationData.value.maxShowButton)
        for(let i=1;i<allButtonPage+1;i++){
            const max=i*paginationData.value.maxShowButton
            const min=(max-paginationData.value.maxShowButton)+1
           if(max>=currentPage && min<=currentPage){
               paginationData.value.startShowPaginationButton=min
               paginationData.value.endShowPaginationButton=max
               break
           }
        }
    }


    const deleteSelectedUsers = async () => {
        fetchTableDataFlag.value=false
        showPreloaderFlag.value=true
        try {
            const deleteUsersRequest=await $fetch(`/api/user/delete-several?username=${selectedUserToDelete.value.join('&username=')}`,{
                method:'DELETE',
                baseURL:apiBase,
                headers:{
                    Authorization:apiKey,
                    token:token.value
                },
                credentials: "include"
            })
            selectedUserToDelete.value.forEach(user=>{
                const idx=tableData.value.rows.findIndex((item)=>item.user===user)
                tableData.value.rows.splice(idx,1)
            })
            selectedUserToDelete.value=[]
            modalData.on=false
        }catch (err) {
            console.log(err)
        }finally {
            fetchTableDataFlag.value=true
            showPreloaderFlag.value=false
        }

    }
    const killSelectedUsers =async () => {
        fetchTableDataFlag.value=false
        showPreloaderFlag.value=true
        try {
            const deleteUsersRequest=await $fetch(`/api/user/kill-several?username=${selectedOnlineUserToKill.value.join('&username=')}`,{
                method:'DELETE',
                baseURL:apiBase,
                headers:{
                    Authorization:apiKey,
                    token:token.value
                },
                credentials: "include"
            });
            selectedOnlineUserToKill.value.forEach(user=>{
                const idx=tableData.value.rows.findIndex((item)=>item.user===user)
                tableData.value.rows.splice(idx,1)
            });
            selectedOnlineUserToKill.value=[]
            modalData.on=false
        }catch (err) {
            console.log(err)
        }finally {
            fetchTableDataFlag.value=true
            showPreloaderFlag.value=false
        }
    }

    const selectOperation = (name:string) => {
        modalData.on=true
        modalData.name=name
    }

    return{
        paginationData,changePerPageHandler,changePage,nextPage,previousPage,searchHandler,searchText,resetSearch,showMoreButton,showLessButton,deleteSelectedUsers,killSelectedUsers,selectOperation,modalData
    }
}