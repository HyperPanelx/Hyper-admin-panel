import {ITable_Data} from "~/utils/Types";


export const usePagination=()=>{
    const tableData=useState<ITable_Data>('tableData')
    const fetchTableDataFlag=useState('fetchTableDataFlag')
    const searchText=useState('tableSearchText',()=>'')
    const paginationData=reactive({
        itemPerPage:5,
        allPages:0,
        sourceData:[] as ITable_Data['rows'],
        currentPageData:[] as ITable_Data['rows'],
        startIdx:0,
        endIdx:0,
        currentPage:1,
        searchResultFlag:false,
        maxShowButton:3,
        startShowPaginationButton:1,
        endShowPaginationButton:3,
    })

    const changePerPageHandler = (value:any) => {
        paginationData.itemPerPage=value.per_page
        paginationUpdate()
    }

    const paginationUpdate = () => {
        paginationData.allPages=Math.ceil(paginationData.sourceData.length/paginationData.itemPerPage);
        paginationData.currentPageData=[...paginationData.sourceData].slice(0,paginationData.itemPerPage)
    }

    const changePage = (pageNumber:number) => {
        if(pageNumber> paginationData.allPages){
            paginationData.currentPage=1
        }else if(pageNumber<1){
            paginationData.currentPage=paginationData.allPages
        }else{
            paginationData.currentPage=pageNumber
        }
        paginationData.endIdx=paginationData.currentPage*paginationData.itemPerPage
        paginationData.startIdx=paginationData.endIdx-paginationData.itemPerPage
        paginationData.currentPageData=[...paginationData.sourceData].slice(paginationData.startIdx,paginationData.endIdx)

    }
    const nextPage = () => {
      changePage(paginationData.currentPage+1)
        goToCurrentButton(paginationData.currentPage)
    }
    const previousPage = () => {
        changePage(paginationData.currentPage-1)
        goToCurrentButton(paginationData.currentPage)
    }


    watch(
        ()=>fetchTableDataFlag.value,
        ()=>{
            if(fetchTableDataFlag.value){
                paginationData.sourceData=tableData.value.rows
                paginationUpdate()
            }
        },
        {
            immediate:true
        }
    )

    const searchHandler = () => {
        paginationData.sourceData=tableData.value.rows
        const searchResult=[...paginationData.sourceData].filter(item=>{
            return item.username.toLowerCase().startsWith(searchText.value.toLowerCase())
        });
        paginationData.sourceData=searchResult
        paginationData.searchResultFlag = searchResult.length === 0;
        paginationUpdate()
    }

    const resetSearch = () => {
        paginationData.sourceData=tableData.value.rows
        searchText.value=''
        paginationUpdate()
        paginationData.searchResultFlag=false
    }
    const showMoreButton = () => {
      paginationData.startShowPaginationButton+=paginationData.maxShowButton
      paginationData.endShowPaginationButton+=paginationData.maxShowButton
    }
    const showLessButton = () => {
        paginationData.startShowPaginationButton-=paginationData.maxShowButton
        paginationData.endShowPaginationButton-=paginationData.maxShowButton
    }

    const goToCurrentButton = (currentPage:number) => {
        const allButtonPage=Math.ceil(paginationData.allPages/paginationData.maxShowButton)
        for(let i=1;i<allButtonPage+1;i++){
            const max=i*paginationData.maxShowButton
            const min=(max-paginationData.maxShowButton)+1
           if(max>=currentPage && min<=currentPage){
               paginationData.startShowPaginationButton=min
               paginationData.endShowPaginationButton=max
               break
           }
        }

    }

    return{
        paginationData,changePerPageHandler,changePage,nextPage,previousPage,searchHandler,searchText,resetSearch,showMoreButton,showLessButton
    }
}