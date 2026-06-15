import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// 请求拦截器（后期加 token）
request.interceptors.request.use(config => config);

// 响应拦截器（统一错误处理）
request.interceptors.response.use(
  res => res.data,
  err => {
    console.error('API Error:', err);
    return Promise.reject(err);
  }
);

export default request;