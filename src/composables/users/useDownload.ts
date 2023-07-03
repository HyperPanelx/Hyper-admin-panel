import {downloadTextFile} from "../../utils/Helper";
import {ref} from "vue";


export const useDownload=(props)=>{
    const downloadAnchorElem=ref<HTMLAnchorElement|null>(null);

    const downloadUserDetail = ()  => {
        if(downloadAnchorElem.value){
            const text:string=`username:${props.user}\npassword:${props.passwd}\nphone:${props.phone}\nemail:${props.email}\nexpired:${props.exdate}\nstatus:${props.status}\ntelegram id:${props.telegram_id}\nregistered:${props?.registered ?? ''}\ntraffic:${props.traffic}\nlimitation:${props.multi}\ndescription:${props.desc}\nreferral:${props.referral}\nserver:${props.server}
            `
            downloadAnchorElem.value.setAttribute("href",     downloadTextFile(text)     );
            downloadAnchorElem.value.setAttribute("download", `${props.user}.txt`);
            downloadAnchorElem.value.click();
        }
    }





    return{
        downloadUserDetail,downloadAnchorElem
    }
}