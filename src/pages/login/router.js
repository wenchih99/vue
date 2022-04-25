import {createRouter,createWebHashHistory} from 'vue-router';
import UserLogin from './components/UserLogin'
import UserRegister from './components/UserRegister'
import PageError from './components/Error'

const routes=[
    {path:'/',component:UserLogin},
    {path:'/login',component:UserLogin},
    {path:'/register',component:UserRegister},
    {path:'/:pathMatch(.*)*',name:'error',component:PageError},
]

const router=new createRouter({
    history: createWebHashHistory(),
    routes
});

export default router