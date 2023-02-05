import axios from 'axios';

export const httpClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

// Add a request interceptor
httpClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log('before', config)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
httpClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('after', response)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});