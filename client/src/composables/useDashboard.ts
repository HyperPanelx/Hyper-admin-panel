import {IUsers_Data,IServer_Status} from "~/utils/Types";

export const useDashboard=()=>{
    const {showPreloaderFlag}=useStates()
    const fetchDashboardDataFlag=useState<boolean>('fetchServerDataFlag',()=>false);
    const usersData=useState<IUsers_Data[]>('usersData',()=>[])
    const {public:{apiKey,apiBase}}=useRuntimeConfig();
    const serverStatus=useState<IServer_Status>('serverStatus',()=>{
        return{
            cpu:0,
            ram:0,
            disk:0,
            bandWidth:{
                download:0,
                upload:0,
                downloadSpeed:0,
                uploadSpeed:0,
                speedUnit:''
            }
        }
    })



    const getServerUsageData=async ()=>{
        try {
            const serverStatusFetchRequest:IServer_Status=await $fetch('/api/dashboard/server',{
                headers:{Authorization:apiKey},
                baseURL:apiBase,
                keepalive:true,
                credentials: "include",
            })
            serverStatus.value=serverStatusFetchRequest
        }catch (err) {
            console.log(err)
        }
    }

    onMounted(async ()=>{
        if(process.client){document.body.style.overflow='hidden'}
        showPreloaderFlag.value=true
        fetchDashboardDataFlag.value=false
        try {
            await getServerUsageData();
            const usersDataFetchRequest:IUsers_Data[]=await $fetch('/api/dashboard/users-status',{
                headers:{Authorization:apiKey},
                baseURL:apiBase,
                credentials: "include",
            });
            usersData.value=usersDataFetchRequest
        }catch (err) {
            console.log(err)
        }finally {
            showPreloaderFlag.value=false
            fetchDashboardDataFlag.value=true
            if(process.client){document.body.style.overflow='auto'}
        }
    })

    const router=useRouter()
    let timer:any=null;
    watch(
        ()=>fetchDashboardDataFlag.value,
         ()=>{
            if(fetchDashboardDataFlag.value){
                timer= setTimeout(async ()=>{
                    fetchDashboardDataFlag.value=false
                    try {
                        await getServerUsageData();
                        fetchDashboardDataFlag.value=true
                    }catch (err) {
                        console.log(err)
                    }
                },15000)
            }
        },{
            immediate:true,
        }
    )

    router.afterEach((to,from)=>{
        if(to.name!=='DASHBOARD' && from.name==='DASHBOARD'){
            /// exit dashboard page
            fetchDashboardDataFlag.value=false
            clearTimeout(timer)
        }
    })


    return{
        serverStatus,fetchDashboardDataFlag,usersData
    }
}