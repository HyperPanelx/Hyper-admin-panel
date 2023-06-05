import {createRouter,createWebHashHistory,RouteRecordRaw} from "vue-router";

const routes:RouteRecordRaw[]=[
    {
        component:import('./pages/index.vue'),
        path:'/',
        redirect:{
            name:'DASHBOARD'
        },
        children:[
            {
                component:import('./pages/dashboard.vue'),
                path:'dashboard',
                name:'DASHBOARD'
            },{
                component:import('./pages/users/index.vue'),
                path:'users',
                name:'USERS',
                children:[
                    {
                        component:import('./pages/users/create.vue'),
                        path:'create',
                        name:'CREATE_USER'
                    }
                ]
            },
            {
                component:import('./pages/onlineUsers.vue'),
                name:'ONLINE',
                path:'online'
            },
            {
                component:import('./pages/settings/index.vue'),
                name:'SETTINGS',
                path:'settings',
                redirect:{
                    name:'CREATE_ADMIN_USER'
                },
                children:[
                    {
                        component: import('./pages/settings/index/create.vue'),
                        name:'CREATE_ADMIN_USER',
                        path: 'create-admin-user'
                    },
                    {
                        component: import('./pages/settings/index/api.vue'),
                        name:'API',
                        path: 'api'
                    },
                    {
                        component: import('./pages/settings/index/ip.vue'),
                        name:'IP_BLOCK',
                        path: 'ip-block'
                    },
                    {
                        component: import('./pages/settings/index/SSH.vue'),
                        name:'SSH_PORT',
                        path: 'ssh-port'
                    },
                    {
                        component: import('./pages/settings/index/backup.vue'),
                        name:'BACKUP_RESTORE',
                        path: 'backup-restore'
                    },
                    {
                        component: import('./pages/settings/index/changePassword.vue'),
                        name:'CHANGE_PASSWORD',
                        path: 'change-password'
                    },
                    {
                        component: import('./pages/settings/index/limitation.vue'),
                        name:'USER_LIMITATION',
                        path: 'user-limitation'
                    },
                    {
                        component: import('./pages/settings/index/multi.vue'),
                        name:'MULTI_SERVER',
                        path: 'multi-server'
                    },
                    {
                        component: import('./pages/settings/index/robot.vue'),
                        name:'TELEGRAM_ROBOT',
                        path: 'telegram-robot'
                    },
                ]
            }
        ]
    },
    {
        component:import('./pages/login.vue'),
        name:'LOGIN',
        path:'/login'
    }

]


const router=createRouter({
    routes,
    history:createWebHashHistory()
})


export default router