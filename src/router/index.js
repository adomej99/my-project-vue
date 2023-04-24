import { createWebHistory, createRouter} from 'vue-router';
import HomePage from '@/components/HomePage.vue'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import BookList from "@/components/BookList.vue";
import BookForm from "@/components/BookForm.vue";
import BookDetail from "@/components/BookDetail.vue";
import LendForm from "@/components/LendForm.vue";
import ReviewList from "@/components/ReviewList.vue";
import ReviewForm from "@/components/ReviewForm.vue";
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
        path: '/lent',
        name: 'BookLentList',
        component: BookLentList
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
    {
        path: '/books/search',
        name: 'AddBook',
        component: AddBook
    },
    {
        path: '/books/add',
        name: 'ManualBookAdd',
        component: ManualBookAdd
    },
    {
        path: '/book/:bookId/history',
        name: 'BookHistory',
        component: BookHistory
    },
    {
        path: '/books/available',
        name: 'BookLendList',
        component: BookLendList
    },
    {
        path: '/books/requests',
        name: 'BookRequestList',
        component: BookRequestList
    },
    {
        path: '/books/returned',
        name: 'BookReturnedList',
        component: BookReturnList
    },
    {
        path: '/books/:bookId/rate-and-review',
        name: 'RatingReviewForm',
        component: RatingReviewForm,
        props: true,
    },
    {
        path: '/books/:bookId/:userId/:requestId/rate-lendee',
        name: 'LendeeReviewForm',
        component: LendeeReviewForm,
        props: true,
    },
    {
        path: '/user/:userId/',
        name: 'UserInfo',
        component: UserInfo
    },
    {
        path: '/admin/panel',
        name: 'AdminPanel',
        component: AdminPanel
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
    },
    {
        path: '/users/report/:userId/:requestId/:ownerId',
        name: 'ReturnReport',
        component: ReturnReport,
    },
    {
        path: '/admin/report_management',
        name: 'ReportManagement',
        component: ReportManagement,
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
});
