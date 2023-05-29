import vCollapsible from '../directive/vCollapsible'
import vFade from '../directive/vFade'
import vClickOutSide from '../directive/vClickOutside'
import vFocus from '../directive/vFocus'
export default defineNuxtPlugin(nuxtApp=>{
    nuxtApp.vueApp.directive('collapse',vCollapsible)
    nuxtApp.vueApp.directive('fade',vFade)
    nuxtApp.vueApp.directive('click-outside',vClickOutSide)
    nuxtApp.vueApp.directive('focus',vFocus)
})