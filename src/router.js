import {createRouter,createWebHashHistory} from 'vue-router';
import postEditor from './components/Editor'
import personalHome from './components/Home'

const routes=[
    {path:'/',component:personalHome},
    {
        path:'/edit',
        name:'edit',
        component:postEditor,
    },
    {
        path:'/home',
        name:'home',
        component:personalHome
    },
]

const router=new createRouter({
    history: createWebHashHistory(),
    routes
});

export default router