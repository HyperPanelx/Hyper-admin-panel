

export const useUserOperation=()=>{

    const editUser = (uid:string|number) => {
        console.log(uid)

    }

    const userSetting = (uid:string|number) => {
        console.log(uid)
    }

    const copyUserDetail = (uid:string|number)  => {
        console.log(uid)
    }



    return{
        editUser,copyUserDetail,userSetting
    }
}