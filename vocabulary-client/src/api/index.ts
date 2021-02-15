import axios, {AxiosInstance} from "axios";

const $host: AxiosInstance = axios.create({
    baseURL: 'http://172.17.0.1:7000/'
});

const $authHost: AxiosInstance = axios.create({
    baseURL: 'http://172.17.0.1:7000/'
});

const authInterceptor = (config) => {
    config.headers.authorization = localStorage.getItem('token')
    return config
};

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}