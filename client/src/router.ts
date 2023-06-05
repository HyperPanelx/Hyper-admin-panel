import {createRouter,createWebHashHistory,RouteRecordRaw} from "vue-router";
import {Auth} from './store/auth'
//// pages
import  MainIndex from './pages/index.vue'
import dashboard from './pages/dashboard.vue'
import usersIndex from './pages/users/index.vue'
import createUser from './pages/users/create.vue'
import settingsIndex from './pages/settings/index.vue'
import onlineUsers from './pages/onlineUsers.vue'
import login from './pages/login.vue'
import error from './pages/error.vue'

//// setting page
import api from './pages/settings/index/api.vue'
import backup from './pages/settings/index/backup.vue'
import create from './pages/settings/index/create.vue'
import ip from './pages/settings/index/ip.vue'
import SSH from './pages/settings/index/SSH.vue'
import robot from './pages/settings/index/robot.vue'
import changePassword from './pages/settings/index/changePassword.vue'
import limitation from './pages/settings/index/limitation.vue'
import multi from './pages/settings/index/multi.vue'


const routes:RouteRecordRaw[]=[
    {
        component:MainIndex,
        path:'/',
        redirect:{
            name:'DASHBOARD'
        },
        children:[
            {
                component:dashboard,
                path:'dashboard',
                name:'DASHBOARD',
                meta:{title:'Dashboard | Hyper'}
            },{
                component:usersIndex,
                path:'users',
                name:'USERS',
                meta:{title:'Users | Hyper'},
                children:[
                    {
                        component:createUser,
                        path:'create',
                        name:'CREATE_USER',
                        meta:{title:'Create User | Hyper'},
                    }
                ]
            },
            {
                component:onlineUsers,
                name:'ONLINE',
                path:'online',
                meta:{title:'Online Users | Hyper'},
            },
            {
                component:settingsIndex,
                name:'SETTINGS',
                path:'settings',
                redirect:{
                    name:'CREATE_ADMIN_USER'
                },
                children:[
                    {
                        component: create,
                        name:'CREATE_ADMIN_USER',
                        path: 'create-admin-user',
                        meta:{title:'Create Admin User | Hyper'},
                    },
                    {
                        component:api,
                        name:'API',
                        path: 'api',
                        meta:{title:'Api | Hyper'},
                    },
                    {
                        component: ip,
                        name:'IP_BLOCK',
                        path: 'ip-block',
                        meta:{title:'IP Block | Hyper'},
                    },
                    {
                        component:SSH,
                        name:'SSH_PORT',
                        path: 'ssh-port',
                        meta:{title:'SSH Port | Hyper'},
                    },
                    {
                        component: backup,
                        name:'BACKUP_RESTORE',
                        path: 'backup-restore',
                        meta:{title:'Backup & Restore | Hyper'},
                    },
                    {
                        component: changePassword,
                        name:'CHANGE_PASSWORD',
                        path: 'change-password',
                        meta:{title:'Change Password | Hyper'},
                    },
                    {
                        component: limitation,
                        name:'USER_LIMITATION',
                        path: 'user-limitation',
                        meta:{title:'User Limitation | Hyper'},
                    },
                    {
                        component: multi,
                        name:'MULTI_SERVER',
                        path: 'multi-server',
                        meta:{title:'Multi Server | Hyper'},
                    },
                    {
                        component: robot,
                        name:'TELEGRAM_ROBOT',
                        path: 'telegram-robot',
                        meta:{title:'Telegram Robot | Hyper'},
                    },
                ]
            }
        ]
    },
    {
        component:login,
        name:'LOGIN',
        path:'/login',
        meta:{title:'Login | Hyper'},
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: error },

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