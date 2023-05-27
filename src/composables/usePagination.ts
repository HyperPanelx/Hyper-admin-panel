import {ITable_Data} from "~/utils/Types";


export const usePagination=()=>{
    const tableData=useState<ITable_Data>('tableData')
    const fetchTableDataFlag=useState('fetchTableDataFlag')
    const searchText=useState('tableSearchText',()=>'')
    const paginationData=reactive({
        itemPerPage:5,
        allPages:0,
        currentPageData:[] as ITable_Data['rows'],
        startIdx:0,
        endIdx:0,
        currentPage:1
    })

    const changePerPageHandler = (value:any) => {
        paginationData.itemPerPage=value.per_page
        paginationUpdate()
    }

    const paginationUpdate = () => {
        paginationData.allPages=Math.ceil(tableData.value.rows.length/paginationData.itemPerPage);
        paginationData.currentPageData=[...tableData.value.rows].slice(0,paginationData.itemPerPage)

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
        paginationData.currentPageData=[...tableData.value.rows].slice(paginationData.startIdx,paginationData.endIdx)

    }
    const nextPage = () => {
      changePage(paginationData.currentPage+1)
    }
    const previousPage = () => {
        changePage(paginationData.currentPage-1)
    }


    watch(
        ()=>fetchTableDataFlag.value,
        ()=>{
            if(fetchTableDataFlag.value){
                paginationData.currentPageData=tableData.value.rows
                paginationUpdate()
            }
        },
        {
            immediate:true
        }
    )
    const searchHandler = () => {
        paginationData.currentPageData=[...tableData.value.rows].filter(item=>{
            return item.username.startsWith(searchText.value)
        })
    }

    const resetSearch = () => {
        paginationUpdate()
    }

    return{
        paginationData,changePerPageHandler,changePage,nextPage,previousPage,searchHandler,searchText,resetSearch
    }
}