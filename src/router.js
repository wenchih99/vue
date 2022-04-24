import {createRouter,createWebHashHistory} from 'vue-router';
import postEditor from './components/Editor'
import personalHome from './components/Home'
import pageError from './components/Error'
import pageAdmin from './components/Admin'

const routes=[
    {
        path:'/',
        name:'index',
        redirect:'/home',
    },
    {
        path:'/admin',
        name:'admin',
        component:pageAdmin
    },
    {
        path:'/edit',
        name:'edit',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component:postEditor,
    },
    {
        path:'/home',
        name:'home',
        component:personalHome
    },
    {
        path:'/:pathMatch(.*)*',
        name:'error',
        component:pageError
    },
]

const router=new createRouter({
    history: createWebHashHistory(),
    routes
});


router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (localStorage.getItem('userid')!=null) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/', // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

export default router