import {
  Loading,
  Message
} from 'element-ui';
// import dialogs from '@/components/dialogs'

import echarts from 'echarts' //引入echarts

import * as http from './http'

export default {
  install(Vue, options) {
    // 组件传值
    // Vue.use(dialogs)
    // Vue.component('dialogs', dialogs)
    /* *
     *成功提示
     */
    Vue.prototype.Gsuccess = function (msg) {
      Message.success({
        message: msg
      })
    }
    /* *
     *警告提示
     */
    Vue.prototype.Gwarning = function (msg) {
      Message.warning({
        message: msg
      })
    }
    /* *
     *失败提示
     */
    Vue.prototype.Gerror = function (msg) {
      Message.error({
        message: msg
      })
    }

    /* *
     *@method echarts
     */
    Vue.prototype.$echarts = echarts;

    /* *
     *@method 引入axios
     */
    // Vue.prototype.$axios = Axios;
    Vue.prototype.$fetchGet = http.fetchGet;
    Vue.prototype.$fetchPost = http.fetchPost;
    Vue.prototype.$fetchPut = http.fetchPut;
    Vue.prototype.$fetchDelete = http.fetchDelete;

    /* *
     *@method 返回功能
     */
    Vue.prototype.getBack = function () {
      this.$router.go(-1)
    }

    /* *
     *@method 判断子串
     *@param {String} 需要判断的子串
     *@return {Boolean}
     */
    Vue.prototype.isContains = function (substr) {
      var str = localStorage.getItem("auth");
      return new RegExp(substr, 'g').test(str);
    };

    /* 
     *@method 删除文件的时间戳
     *@param {Str} 文件名
     *@return {Str} 删除时间戳后的文件名
     * */
    Vue.prototype.deletetimestamp = function (name) {
      let str = '';
      let oldname = name.lastIndexOf('.');
      let fileName = name.substring(0, oldname);
      let fileType = name.substring(oldname, oldname.length)
      fileName = fileName.substring(0, fileName.length - 13);
      str = fileName + fileType;
      return str;
    };

    /**
     * @method 获取cookie
     * @param {String} 获取coolie的key
     * @return {String} 获取coolie的value
     */
    Vue.prototype.getCookie = function (name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    };
    /**
     * @method 深拷贝 
     * @param {Obj} 需要拷贝的 对象 数组
     * @return {Obj}
     */
    Vue.prototype.cloneObj = function (obj) {
      let _this = this;
      let str, newobj = obj.constructor === Array ? [] : {};
      if (typeof obj !== 'object') {
        return;
      } else if (window.JSON) {
        str = JSON.stringify(obj);
        newobj = JSON.parse(str);
      } else {
        for (var i in obj) {
          newobj[i] = typeof obj[i] === 'object' ? _this.cloneObj(obj[i]) : obj[i];
        }
      }
      return newobj;
    };


    /* *
     *全局过滤 时间
     */
    Vue.filter('FormatTime', (value, arg) => {
      if (value) {
        return new Date(value).Format(arg)
      }
    });

    /* *
     *全局过滤 性别
     */
    Vue.filter('FormatSex', (value) => {
      if (value == 0) {
        return "男"
      } else if (value == 1) {
        return "女"
      }
    });
  }
}
