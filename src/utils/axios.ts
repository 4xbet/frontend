import axios from 'axios';
import router from '../router';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('accessToken');

            console.log(
                'Access token истек или недействителен. Перенаправление на страницу входа.'
            );

            router.push({ name: 'Login', query: { sessionExpired: 'true' } });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
