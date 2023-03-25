import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import BookList from "@/components/BookList.vue";
import BookForm from "@/components/BookForm.vue";
import BookDetail from "@/components/BookDetail.vue";
import LendForm from "@/components/LendForm.vue";
import LendList from "@/components/LendList.vue";
import ReviewList from "@/components/ReviewList.vue";
import ReviewForm from "@/components/ReviewForm.vue";

Vue.use(Router)

let Messages;
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/books',
            name: 'BookList',
            component: BookList
        },
        {
            path: '/books/new',
            name: 'BookForm',
            component: BookForm
        },
        {
            path: '/books/:id',
            name: 'BookDetail',
            component: BookDetail
        },
        {
            path: '/lend',
            name: 'LendForm',
            component: LendForm
        },
        {
            path: '/borrow',
            name: 'LendList',
            component: LendList
        },
        {
            path: '/reviews',
            name: 'ReviewList',
            component: ReviewList
        },
        {
            path: '/reviews/new',
            name: 'ReviewForm',
            component: ReviewForm
        },
        // {
        //     path: '/messages',
        //     name: 'Messages',
        //     component: Messages
        // }
    ]
})

router.beforeEach((to, from, next) => {
    const loggedIn = Vue.$cookies.get('token')

    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/login')
    } else {
        next()
    }
})

export default router
