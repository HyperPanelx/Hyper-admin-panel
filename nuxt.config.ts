
// https://res.cloudinary.com/dhpxutwun/image/upload/v1684354705/hyper/logo-lg_hqn9rt.png
export default defineNuxtConfig({
    image:{
      cloudinary:{
          baseURL:'https://res.cloudinary.com/dhpxutwun/image/upload/'
      }
    },
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
    ],
    app:{
        rootId:'v-app',
        rootTag:'main',
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
        '@pinia/nuxt','@nuxt/image-edge'
    ],
})
