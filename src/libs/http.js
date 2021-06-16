import axios from 'axios'
import router from '../router/index'
import store from '@/stores'
import qs from 'qs'
import {
  Loading,
  Message
} from 'element-ui'


// 创建axios实例
export const Axios = axios.create({
  baseURL:'/busbrain',
  // baseURL: "/api2db/",
  timeout: 30000,
  withCredentials: true // 是否允许带cookie这些
});

// request拦截器
Axios.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = store.getters.token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
  },
  error => {
    return Promise.reject(error);
  }
);


// response过滤器
Axios.interceptors.response.use(
  // 正确处理
  res => {
    let data = res.data;
    return data;
  },
  // 错误处理
  error => {
    let res = error.response;
    if (res.status == 401) {
      switch (res.status) {
        //401 登录过期 返回登录
        case 401:
          Message.error({
            message: '登录过期，请重新登录'
          });
          router.replace({
            path: '/login?flag=true'
          })
          break;
        // case 500:
        //   Message.error({
        //     message: '登录超时'
        //   });
        //   router.replace({
        //     path: '/login'
        //   })
        //   break;
      }
    } else {
      Message.error({
        message: '网络错误，请刷新重试'
      });
      // router.replace({
      //   path: '/login'
      // })
    }
    return Promise.reject(error);
  }
);

// url传参
function urlParams (method, url, params) {
  return new Promise((resolve, reject) => {
    Axios({
      url,
      method,
      params,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(
      res => {
        resolve(res);
      },
      error => {
        reject(error)
      }
    )
      .catch((error) => {
        reject(error);
      })
  })
}

// body传参
function bodyParams (method, url, params, contentType) {
  return new Promise((resolve, reject) => {
    Axios({
      url,
      method,
      data: contentType == 'json' ? params : qs.stringify(params),
      headers: {
        "Content-Type": contentType == 'json' ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then(
      res => {
        resolve(res);
      },
      error => {
        reject(error)
      }
    ).catch((error) => {
      reject(error);
    })
  })
}

export function fetchGet (url, params = '') {
  return urlParams("get", url, params);
}

export function fetchDelete (url, params = '') {
  return urlParams("delete", url, params);
}

export function fetchPost (url, params, contentType) {
  return bodyParams("post", url, params, contentType);
}

export function fetchPut (url, params, contentType) {
  return bodyParams("put", url, params, contentType);
}