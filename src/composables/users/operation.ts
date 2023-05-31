

export const useUserOperation=(props:any)=>{
    const downloadAnchorElem=ref<HTMLAnchorElement|null>(null)


    const editUser = (uid:string|number) => {
        console.log(uid)

    }

    const userSetting = (uid:string|number) => {
        console.log(uid)
    }

    const downloadUserDetail = ()  => {
        if(downloadAnchorElem.value && process.client){
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
                username:props.user,
                password:props.passwd,
                phone:props.phone,
                email:props.email,
                expired:props.exdate,
                status:props.status,
                telegram_id:props.telegram_id,
                registered:props.registered,
                traffic:props.traffic,
                limitation:props.multi,
                desc:props.desc,
                referral:props.referral,
            }));
            downloadAnchorElem.value.setAttribute("href",     dataStr     );
            downloadAnchorElem.value.setAttribute("download", `${props.user}.json`);
            downloadAnchorElem.value.click();
        }
    }



    return{
        editUser,downloadUserDetail,userSetting,downloadAnchorElem
    }
}