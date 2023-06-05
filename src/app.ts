import {createApp} from "vue";
import App from "./App.vue";


//////////// Tailwind.config
import './assets/Tailwind.config/Tailwind.base.scss'
import './assets/Tailwind.config/Tailwind.component.scss'
import './assets/Tailwind.config/Tailwind.utilities.scss'
import './assets/components/card.scss'
import './assets/components/conatiner.scss'
import './assets/components/dropdown.scss'
import './assets/components/layout.scss'
import './assets/components/form.scss'
import './assets/components/login.scss'
import './assets/components/modal.scss'
import './assets/components/navbar.scss'
import './assets/components/sidebar.scss'
import './assets/components/skelton.scss'
import './assets/components/table.scss'
import './assets/components/tooltip.scss'
import './assets/components/transition.scss'
import './assets/components/general.scss'

/////////// main style
import './assets/app.scss';


//// router
import router from "./router";


//////////// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faCircleCheck,faXmark,faEye,faEyeSlash,faCircleExclamation} from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-brands-svg-icons'
import {faCircle} from '@fortawesome/free-regular-svg-icons'
library.add(faCircle,faCircleCheck,faXmark,faEye,faEyeSlash,faCircleExclamation)


///// dependencies
// @ts-ignore
import VueApexCharts from "vue3-apexcharts";
import { plugin ,defaultConfig} from '@formkit/vue';
import '@formkit/addons/css/floatingLabels';
import 'ladda/dist/ladda-themeless.min.css';
import config from '../formkit.config'
import {btnColor,textColor,bgColor} from "./plugins/color";
import vClickOutSide from './directive/vClickOutside'
import vFocus from './directive/vFocus'
import vFade from './directive/vFade'
import vCollapsible from './directive/vCollapsible'
import column from './components/grid/column.vue'
import container from './components/grid/container.vue'
import containerFull from './components/grid/containerFull.vue'
import row from './components/grid/row.vue'
// @ts-ignore
import { createPinia } from 'pinia';
import VueCookies from 'vue-cookies'

///// app
const app=createApp(App)
const pinia = createPinia()
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router)
app.use(VueApexCharts);
app.use(textColor);
app.use(bgColor);
app.use(btnColor);
app.directive('collapse',vCollapsible);
app.directive('fade',vFade);
app.directive('click-outside',vClickOutSide);
app.directive('focus',vFocus);
app.component('row',row);
app.component('column',column);
app.component('container-full',containerFull);
app.component('container',container);
app.use(plugin, defaultConfig(config));
app.use(pinia);
app.use(VueCookies,{
    expires:10*24*60*60,
    path:'/'
})
app.mount('#v-app');
