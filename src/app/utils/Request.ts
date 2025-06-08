import { message } from 'antd';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';

interface Results<T> {
    code: number;
    message: string;
    data: T;
}

const isServer = typeof window === 'undefined';

const service: AxiosInstance = axios.create({
    baseURL: isServer ? process.env.NEXT_PUBLIC_API_BASE_URL : '/deslre',
    timeout: 5000,
});

// service.interceptors.request.use(
//   (config) => {
//     console.log('[请求拦截器] 请求路径:', config.baseURL + config.url);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            const visitorToken = localStorage.getItem('visitorToken');
            const visitorId = localStorage.getItem('visitorId');

            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            if (visitorToken && config.headers) {
                config.headers['X-Visitor-Token'] = visitorToken;
            }
            if (visitorId && config.headers) {
                config.headers['X-Visitor-Id'] = visitorId;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data;
        if (res.code !== 200) {
            if (typeof window !== 'undefined') {
                message.error(res.message || '请求错误');
            }
            return Promise.reject(res);
        }
        return res;
    },
    (error) => {
        if (typeof window !== 'undefined') {
            message.error(error.message || '请求失败');
        }
        return Promise.reject(error);
    }
);


// 通用的 POST 方法（支持 json 和 form-urlencoded）
const post = <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    contentType: 'json' | 'form' = 'json' // 控制是否发送 x-www-form-urlencoded
): Promise<Results<T>> => {
    if (contentType === 'form') {
        return service.post(url, qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...config?.headers, // 保证其他 headers 不丢失
            },
            ...config,
        });
    }
    return service.post(url, data, config); // 默认发送 json 格式
};

// 通用的 GET 方法
const get = <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<Results<T>> => {
    return service.get(url, { params, ...config });
};

// 封装请求的方法
const request = {
    get,
    post,
    instance: service,
};

export default request;
