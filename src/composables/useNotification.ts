import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {onMounted} from "vue";
import {INotification} from "../utils/Types";
import {notificationStore} from "../store/notification";

export const useNotification=()=>{
    const dropdownFlag=ref<boolean>(false);
    const route=useRoute()
    watch(
        ()=>route.query,
        ()=>{
            dropdownFlag.value=false
        }
    )

    onMounted(async ()=>{
       try {
           const response=await fetch('http://166.1.131.76:3939/notify');
           const news:{title:string,content:string,link:string}[]=await response.json();
            const result:INotification[]=news.map(item=>{
                return {
                    title:item.title,
                    status:'news',
                    msg:item.content,
                    link:item.link.startsWith('http') ? item.link : 'https://'+item.link
                }
            });
            result.forEach(item=>{notificationStore.addNotification(item)})
       }catch (err) {
           console.log(err)
       }
    })



    return {
        dropdownFlag
    }


}