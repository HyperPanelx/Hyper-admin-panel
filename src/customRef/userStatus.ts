import {customRef, Ref} from "vue";
import {IUser_Status,IUseUserStatusRef} from "../utils/Types";

export function useUserStatusRef<T>(value:T):Ref<T>{
    return customRef((track, trigger)=>{
        return {
            get():any{
                track()
                return value
            },
            set(newValue:IUser_Status){
                value=[
                    {title:'Total Users', number:newValue.total_users,theme:'indigo'},
                    {title:'Active Users', number:newValue.total_active_users, theme:'green'},
                    {title:'Enable Users', number:newValue.total_enable_users, theme:'blue'},
                    {title:'Blocked Users', number:newValue.total_disabled_users,theme:'red'},
                ] as T;
                trigger()
            }
        }
    })

}