import axios from 'axios';
import {router} from '@/router';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 403) {
            const errorMessage = error.response.data.message || 'Unauthorized';
            alert(`Error: ${errorMessage}`);
            router.push({name: 'Home'});
        }
        if (error.response.status === 401) {
            const currentRoute = router.currentRoute.name;
            const excludedRoutes = ['/role', '/notifications'];
            if (!excludedRoutes.includes(currentRoute)) {
                alert('Authentication expired. Please login again.');
                router.push({name: 'Login'});
            }
            return Promise.reject(error);
        }
    }
);

export default instance;
