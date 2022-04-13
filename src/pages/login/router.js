import {createRouter,createWebHashHistory} from 'vue-router';
import UserLogin from './components/UserLogin'
import UserRegister from './components/UserRegister'
import PwdForgot from './components/PwdForgot'

const routes=[
    {path:'/',component:UserLogin},
    {path:'/login',component:UserLogin},
    {path:'/register',component:UserRegister},
    {path:'/pwdforgot',component:PwdForgot}
]

const router=new createRouter({
    history: createWebHashHistory(),
    routes
});

export default router