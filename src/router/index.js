import { createWebHistory, createRouter} from 'vue-router';
import HomePage from '@/components/HomePage.vue'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import BookList from "@/components/BookList.vue";
import AddBook from "@/components/AddBook.vue";
import BookHistory from "@/components/BookHistory.vue";
import BookLendList from "@/components/BookLendList.vue";
import BookRequestList from "@/components/BookRequestList.vue";
import BookLentList from "@/components/BookLentList.vue";
import BookReturnList from "@/components/BookReturnList.vue";
import RatingReviewForm from "@/components/RatingReviewForm.vue";
import LendeeReviewForm from "@/components/LendeeReviewForm.vue";
import UserInfo from "@/components/UserInfo.vue";
import AdminPanel from "@/components/AdminPanel.vue";
import AdminBooksLayout from "@/components/AdminBooksLayout.vue";
import UserManagement from "@/components/UserManagement.vue";
import ReturnReport from "@/components/ReturnReport.vue";
import ReportManagement from "@/components/ReportManagement.vue";
import ManualBookAdd from "@/components/ManualBookAdd.vue";
import MainBookList from "@/components/MainBookList.vue";
import MyLendedBooks from "@/components/MyLendedBooks.vue";
import PendingRequests from "@/components/PendingRequests.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage
    },
    {
        path: '/books/available',
        name: 'MainBookList',
        component: MainBookList,
        meta: { requiresAuth: true }
    },
    {
        path: '/books/',
        name: 'BookList',
        component: BookList,
        meta: { requiresAuth: true }
    },
    {
        path: '/lent',
        name: 'BookLentList',
        component: BookLentList,
        meta: { requiresAuth: true }
    },
    {
        path: '/books/search',
        name: 'AddBook',
        component: AddBook,
        meta: { requiresAuth: true }
    },
    {
        path: '/books/add',
        name: 'ManualBookAdd',
        component: ManualBookAdd,
        meta: { requiresAuth: true }
    },
    {
        path: '/book/:bookId/history',
        name: 'BookHistory',
        component: BookHistory,
        meta: { requiresAuth: true }
    },
    {
        path: '/books/available/:isbn',
        name: 'BookLendList',
        component: BookLendList,
        meta: { requiresAuth: true },
        props: true,
    },
    {
        path: '/books/requests',
        name: 'BookRequestList',
        component: BookRequestList,
        meta: { requiresAuth: true }
    },
    {
        path: '/books/my_lent',
        name: 'MyLendedBooks',
        component: MyLendedBooks,
        meta: { requiresAuth: true }
    },
    {
        path: '/books/returned',
        name: 'BookReturnedList',
        component: BookReturnList,
        meta: { requiresAuth: true }
    },
    {
        path: '/requests/pending',
        name: 'PendingRequests',
        component: PendingRequests,
        meta: { requiresAuth: true }
    },
    {
        path: '/books/:bookId/rate-and-review',
        name: 'RatingReviewForm',
        component: RatingReviewForm,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/books/:bookId/:userId/:requestId/rate-lendee',
        name: 'LendeeReviewForm',
        component: LendeeReviewForm,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/:userId/',
        name: 'UserInfo',
        component: UserInfo,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/panel',
        name: 'AdminPanel',
        component: AdminPanel,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/book_management',
        name: 'BookManagement',
        component: AdminBooksLayout,
    },
    {
        path: '/admin/user_management',
        name: 'UserManagement',
        component: UserManagement,
        meta: { requiresAuth: true }
    },
    {
        path: '/users/report/:userId/:requestId/:ownerId',
        name: 'ReturnReport',
        component: ReturnReport,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/report_management',
        name: 'ReportManagement',
        component: ReportManagement,
        meta: { requiresAuth: true }
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem('access_token')
        if (!token) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})
