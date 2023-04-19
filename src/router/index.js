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
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
});
