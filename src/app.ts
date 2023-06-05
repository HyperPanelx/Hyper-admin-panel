import {createApp} from "vue";
import App from "./App.vue";


//////////// Tailwind.config
import './assets/Tailwind.config/Tailwind.base.scss'
import './assets/Tailwind.config/Tailwind.component.scss'
import './assets/Tailwind.config/Tailwind.utilities.scss'

/////////// main style
import './assets/app.scss';


//// router
import router from "./router";


//////////// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-brands-svg-icons'
import {} from '@fortawesome/free-regular-svg-icons'
library.add()


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
app.mount('#v-app');
