
// https://res.cloudinary.com/dhpxutwun/image/upload/v1684354705/hyper/logo-lg_hqn9rt.png
/// <nuxt-img provider="cloudinary" src="v1684354705/hyper/logo-lg_hqn9rt.png"/>-->
// https://res.cloudinary.com/dhpxutwun/image/upload/v1684759508/hyper/login_iudqzb.jpg
export default defineNuxtConfig({
    // @ts-ignore
    nuxtIcon: {
        size: '30px', // default <Icon> size applied
        class: 'v-icon', // default <Icon> class applied
        aliases: {
            'nuxt': 'logos:nuxt-icon',
        }
    },
    image:{
        cloudinary:{
            baseURL:'https://res.cloudinary.com/dhpxutwun/image/upload/'
        }
    },
    // @ts-ignore
    postcss:{
        plugins: {
            'postcss-import': {},
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    build:{
        transpile:[],
    },
    css:[
        '~/assets/App.css',
        '~/assets/Tailwind.config/Tailwind.base.css',
        '~/assets/Tailwind.config/Tailwind.component.css',
        '~/assets/Tailwind.config/Tailwind.utilities.css',
        'ladda/dist/ladda-themeless.min.css',
        '@formkit/addons/css/floatingLabels'
    ],
    app:{
        rootId:'v-app',
        rootTag:'div',
        head:{
            title:'Dashboard | Hyper',
            meta: [
                { name: 'viewport', content: 'width=device-width ,initial-scale=1.0' },
                { name: 'description', content: 'welcome to My project' },
                { name: 'keyword', content: 'HTML,CSS,Js developer' },
                { "http-equiv": 'X-UA-Compatible', content: 'ie=edge' },
            ],
            link:[
                {href:'https://res.cloudinary.com/dhpxutwun/image/upload/v1684354705/hyper/logo-sm_vy0fj0.png',rel:'icon'}
            ],
            bodyAttrs:{}
        }
    },
    srcDir: './src',
    modules: [
        '@pinia/nuxt','@nuxt/image-edge','@nuxtjs/tailwindcss','@formkit/nuxt','nuxt-icon'
    ],
    formkit:{
        defaultConfig:false,
        configFile:'./formkit.config.ts'
    },
    runtimeConfig:{
        cookieName:process.env.COOKIE_NAME,
        public:{
            internalApiKey:process.env.INTERNAL_API_KEY
        }
    }
})
