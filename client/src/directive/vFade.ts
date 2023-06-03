
export default {
    mounted(el:HTMLElement,binding:any){
        el.style.cssText=`transition:all ${binding.arg}ms linear`
        el.style.opacity='0'
        el.style.visibility='hidden'
    },
    updated(el:HTMLElement,binding:any){
        if(binding.value){
            el.style.visibility='visible'
            el.style.opacity='1'
            el.style.zIndex=binding.modifiers
        }else {
            el.style.opacity='0'
            el.style.visibility='hidden'
            el.style.zIndex='-1'
        }
    }
}