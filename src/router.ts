import {createRouter,createWebHashHistory,RouteRecordRaw,createWebHistory} from "vue-router";
import {useRouter} from "vue-router";
import {Auth} from './store/auth'
//// pages
const MainIndex=()=>import(  './pages/index.vue')
const dashboard=()=>import( './pages/dashboard.vue')
const usersIndex=()=>import( './pages/users/index.vue')
const createUser=()=>import( './pages/users/create.vue')
const usersList=()=>import( './pages/users/list.vue')
const settingsIndex=()=>import( './pages/settings/index.vue')
const onlineUsers=()=>import( './pages/onlineUsers.vue')
const generateUser=()=>import('./pages/users/generate.vue')
const login=()=>import( './pages/login.vue')
const error=()=>import( './pages/error.vue')
const editUser=()=>import('./pages/users/edit.vue')



//// setting page
const api=()=>import( './pages/settings/index/api.vue')
const backup=()=>import( './pages/settings/index/backup.vue')
const create=()=>import( './pages/settings/index/create.vue')
const ip=()=>import( './pages/settings/index/ip.vue')
const SSH=()=>import( './pages/settings/index/SSH.vue')
const robot=()=>import( './pages/settings/index/robot.vue')
const changePassword=()=>import( './pages/settings/index/changePassword.vue')
const limitation=()=>import( './pages/settings/index/limitation.vue')
const multi=()=>import( './pages/settings/index/multi.vue')


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
                meta:{title:'Dashboard | Hyper',status:true}
            },{
                component:usersIndex,
                path:'users',
                name:'USERS_INDEX',
                redirect:{
                    name:'USERS'
                },
                children:[
                    {
                        component:editUser,
                        path:'edit',
                        name:'EDIT_USER',
                        meta:{title:'Edit User | Hyper',status:true}
                    },
                    {
                        component:createUser,
                        path:'create',
                        name:'CREATE_USER',
                        meta:{title:'Create User | Hyper',status:true},
                    },{
                        component:usersList,
                        path:'',
                        name:'USERS',
                        meta:{title:'Users | Hyper',status:true},
                    },
                    {
                        component:generateUser,
                        path:'generate',
                        name:'GENERATE_USER',
                        meta:{title:'Generate Users | Hyper',status:true},
                    },
                ]
            },
            {
                component:onlineUsers,
                name:'ONLINE',
                path:'online',
                meta:{title:'Online Users | Hyper',status:true},
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
                        meta:{title:'Create Admin User | Hyper',status:true},
                    },
                    {
                        component:api,
                        name:'API',
                        path: 'api',
                        meta:{title:'Api | Hyper',status:false},
                    },
                    {
                        component: ip,
                        name:'IP_BLOCK',
                        path: 'ip-block',
                        meta:{title:'IP Block | Hyper',status:false},
                    },
                    {
                        component:SSH,
                        name:'SSH_PORT',
                        path: 'ssh-port',
                        meta:{title:'SSH Port | Hyper',status:false},
                    },
                    {
                        component: backup,
                        name:'BACKUP_RESTORE',
                        path: 'backup-restore',
                        meta:{title:'Backup & Restore | Hyper',status:false},
                    },
                    {
                        component: changePassword,
                        name:'CHANGE_PASSWORD',
                        path: 'change-password',
                        meta:{title:'Change Password | Hyper',status:true},
                    },
                    {
                        component: limitation,
                        name:'USER_LIMITATION',
                        path: 'user-limitation',
                        meta:{title:'User Limitation | Hyper',status:false},
                    },
                    {
                        component: multi,
                        name:'MULTI_SERVER',
                        path: 'multi-server',
                        meta:{title:'Multi Server | Hyper',status:false},
                    },
                    {
                        component: robot,
                        name:'TELEGRAM_ROBOT',
                        path: 'telegram-robot',
                        meta:{title:'Telegram Robot | Hyper',status:false},
                    },
                ]
            }
        ]
    },
    {
        component:login,
        name:'LOGIN',
        path:'/login',
        meta:{title:'Login | Hyper',status:true},
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: error ,meta:{title:'Page not found!',status:true},},

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
    if(to.meta.status){
        if(to.name!=='LOGIN'){
            if(authStore.isLogin){
                next()
            }
        }else{
            next()
        }
    }
})

export default router