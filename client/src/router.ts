import {createRouter,createWebHashHistory,RouteRecordRaw} from "vue-router";
import {Auth} from './store/auth'

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
                name:'DASHBOARD',
                meta:{title:'Dashboard | Hyper'}
            },{
                component:import('./pages/users/index.vue'),
                path:'users',
                name:'USERS',
                meta:{title:'Users | Hyper'},
                children:[
                    {
                        component:import('./pages/users/create.vue'),
                        path:'create',
                        name:'CREATE_USER',
                        meta:{title:'Create User | Hyper'},
                    }
                ]
            },
            {
                component:import('./pages/onlineUsers.vue'),
                name:'ONLINE',
                path:'online',
                meta:{title:'Online Users | Hyper'},
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
                        path: 'create-admin-user',
                        meta:{title:'Create Admin User | Hyper'},
                    },
                    {
                        component: import('./pages/settings/index/api.vue'),
                        name:'API',
                        path: 'api',
                        meta:{title:'Api | Hyper'},
                    },
                    {
                        component: import('./pages/settings/index/ip.vue'),
                        name:'IP_BLOCK',
                        path: 'ip-block',
                        meta:{title:'IP Block | Hyper'},
                    },
                    {
                        component: import('./pages/settings/index/SSH.vue'),
                        name:'SSH_PORT',
                        path: 'ssh-port',
                        meta:{title:'SSH Port | Hyper'},
                    },
                    {
                        component: import('./pages/settings/index/backup.vue'),
                        name:'BACKUP_RESTORE',
                        path: 'backup-restore',
                        meta:{title:'Backup & Restore | Hyper'},
                    },
                    {
                        component: import('./pages/settings/index/changePassword.vue'),
                        name:'CHANGE_PASSWORD',
                        path: 'change-password',
                        meta:{title:'Change Password | Hyper'},
                    },
                    {
                        component: import('./pages/settings/index/limitation.vue'),
                        name:'USER_LIMITATION',
                        path: 'user-limitation',
                        meta:{title:'User Limitation | Hyper'},
                    },
                    {
                        component: import('./pages/settings/index/multi.vue'),
                        name:'MULTI_SERVER',
                        path: 'multi-server',
                        meta:{title:'Multi Server | Hyper'},
                    },
                    {
                        component: import('./pages/settings/index/robot.vue'),
                        name:'TELEGRAM_ROBOT',
                        path: 'telegram-robot',
                        meta:{title:'Telegram Robot | Hyper'},
                    },
                ]
            }
        ]
    },
    {
        component:import('./pages/login.vue'),
        name:'LOGIN',
        path:'/login',
        meta:{title:'Login | Hyper'},
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: import('./pages/error.vue') },

]


const router=createRouter({
    routes,
    history:createWebHashHistory()
})


router.afterEach((to,from,next)=>{
    (document.title as any)=to.meta.title
})

router.beforeEach((to,from,next)=>{
    const authStore=Auth();
    if(to.name!=='LOGIN'){
        if(authStore.isLogin){
            next()
        }
    }else{
        next()
    }

})

export default router