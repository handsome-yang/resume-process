import axios from 'axios';
import QS from 'qs';
/**
 * 环境切换
 */

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://iot.xiaofuonline.com/Staff_management_app/Home/HealthStatus';
    // axios.defaults.baseURL = '10.116.57.136/Staff_management_app/Home/HealthStatus';
} else if (process.env.NODE_ENV == "debug") {
    axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV == "production") {
    axios.defaults.baseURL = 'http://iot.xiaofuonline.com/Staff_management_app/Home/HealthStatus';
}

// 设置请求超时时间
axios.defaults.timeout = 60000;

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    });
}


export const addAgreement = params => {return post('/addHealthStatusInfo',params).then(res => res)} 

export const getHealthStatus = () => {return get('/getHealthStatusList').then(res => res)}