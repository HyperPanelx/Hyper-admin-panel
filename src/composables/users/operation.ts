

export const useUserOperation=(props:any)=>{

    const editUser = (uid:string|number) => {
        console.log(uid)

    }

    const userSetting = (uid:string|number) => {
        console.log(uid)
    }

    const copyUserDetail = ()  => {
        const txt=`username:${props.user} \n password:${props.passwd} \n phone:${props.phone} \n email:${props.email || ''} \n expired:${props.exdate} \n status:${props.status} \n telegram id:${props.telegram_id}`
      navigator.clipboard.writeText(txt);
      alert(`copied: \n ${txt}`)
    }



    return{
        editUser,copyUserDetail,userSetting
    }
}