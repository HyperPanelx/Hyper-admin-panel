<h1 style="display: flex;align-items: center; gap:1rem"><img src="./src/public/logo-sm.png"/> Hyper Admin Panel </h1>  
<a href='https://github.com/hoomanFsmo77/Hyper-admin-panel/tree/master/frontend' target="_blank"><img alt='' src='https://img.shields.io/badge/Release_V0.0.9-100000?style=flat&logo=&logoColor=3178C6&labelColor=333333&color=333333'/></a>

## Tech

<a href='https://vuejs.org/' target="_blank"><img alt='vuedotjs' src='https://img.shields.io/badge/Vue_js V3.3.4-100000?style=flat&logo=vuedotjs&logoColor=4FC08D&labelColor=333333&color=333333'/></a>   <a href='https://router.vuejs.org/' target="_blank"><img alt='vuedotjs' src='https://img.shields.io/badge/Vue_router V4.2.1-100000?style=flat&logo=vuedotjs&logoColor=4FC08D&labelColor=333333&color=333333'/></a>    <a href='https://pinia.vuejs.org/' target="_blank"><img alt='vuedotjs' src='https://img.shields.io/badge/Pinia_V2.1.3-100000?style=flat&logo=vuedotjs&logoColor=4FC08D&labelColor=333333&color=333333'/></a> <a href='https://tailwindcss.com/' target="_blank"><img alt='tailwindcss' src='https://img.shields.io/badge/Tailwindcss_V3.2.6-100000?style=flat&logo=tailwindcss&logoColor=06B6D4&labelColor=333333&color=333333'/></a> <a href='https://apexcharts.com' target="_blank"><img alt='chartdotjs' src='https://img.shields.io/badge/Apexchart_V3.40-100000?style=flat&logo=chartdotjs&logoColor=FF6384&labelColor=333333&color=333333'/></a> <a href='https://fontawesome.com/' target="_blank"><img alt='fontawesome' src='https://img.shields.io/badge/Fontawesome_V6.4-100000?style=flat&logo=fontawesome&logoColor=528DD7&labelColor=333333&color=333333'/></a> <a href='https://www.typescriptlang.org/' target="_blank"><img alt='typescript' src='https://img.shields.io/badge/Typescript_V4.9.5-100000?style=flat&logo=typescript&logoColor=3178C6&labelColor=333333&color=333333'/></a>  <a href='https://webpack.js.org/' target="_blank"><img alt='webpack' src='https://img.shields.io/badge/Webpack_V5.75.0-100000?style=flat&logo=webpack&logoColor=8DD6F9&labelColor=333333&color=333333'/></a> <a href='https://formkit.com/' target="_blank"><img alt='reacthookform' src='https://img.shields.io/badge/Formkit_V0.17.2-100000?style=flat&logo=reacthookform&logoColor=EC5990&labelColor=333333&color=333333'/></a>

## Preview

### Panel contains 4 main pages
#### 1- Dashboard
##### in this page as you can see is server and client status are live visible that is programmed by web socket.
<img alt="page 1" src="./src/public/github/p1.png">

#### 2- Users

##### this page belongs to users and its operation. You are able to 1- change the password 2- renew expired user 30  3- lock/unlock user 4- download user detail in text file 5- edit user detail 6- generate several user 7- create single user
<img alt="page 2" src="./src/public/github/p2.png">

#### 3- Online users
##### in this page is shown the status of online user, which you can disconnect their connection.
<img alt="page 3" src="./src/public/github/p3.png">

#### 4- Settings
##### as you can see there are plenty of options for admins to control admin panel.
<img alt="page 4" src="./src/public/github/p4.png">

## Project structure

```
├── tailwind.config.js => tailwind class configs
├── colors.ts => project color palates
├── index.html
├── webpack.dev.config.ts => webpack config for development
├── webpack.prod.config.ts => webpack config for production
├── tsconfig.json => typescript config
├── postcss.config.js => postcss config for tailwind and bundling
├── formkit.config.ts => formkit plugins
├── .d.ts => typescript decleration
├── .babelrc => using babelrc for transfering js high level ecmascript code to low level for better proformance on older browser
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── app.ts  => entry point file for webpack and packages
    ├── App.vue  => entry point vue component
    ├── router.ts  => page routing configs
    ├── shims-vue.d.ts => typescript deleration file for vue components
    └── utils
        ├── Data.ts => tabs data
        ├── Helper.ts => some helper function
        └── Types.ts  => interfaces
    └── store
        ├── auth.ts => authentication store for saving user token and username
        ├── dashboard.ts
        └── table.ts
    └── public => images and assets
    └── plugins => vue plugin
    └── pages => all pages component
    └── layout => repeatable sections in pages put in layout components
    └── directive => some vue directives
    └── composables => logic of the app
    └── components
    └── assets  => all styles place here
```

## Setup for developing project

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```
#### Then you need to create a .env.production file name (for building project) and .env.development file name (for developing project) file in root of the project and add these keys and your values

| Key           | Type     | Description                                        |
|:--------------| :------- |:---------------------------------------------------|
| `API_BASE`    | `string` | **Required**. Api Url format: https://example.com/ |
| `COOKIE_NAME` | `string` | **Optional**. Just a name.                         |
| `VERSION`     | `string` | **Optional**. Current Version:0.0.9.               |

## Development Server

Start the development server on `http://localhost:9000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```
