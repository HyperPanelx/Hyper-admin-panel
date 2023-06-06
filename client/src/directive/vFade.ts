
export default {
    mounted(el:HTMLElement,{arg}:any){
        el.style.cssText=`transition:all ${arg as number}ms linear`
        el.style.opacity='0'
        el.style.visibility='hidden'
    },
    updated(el:HTMLElement,{modifiers,value}:any){
        if(value as boolean){
            el.style.visibility='visible'
            el.style.opacity='1'
            el.style.zIndex=`${modifiers as number}`
        }else {
            el.style.opacity='0'
            el.style.visibility='hidden'
            el.style.zIndex='-1'
        }
    }
}