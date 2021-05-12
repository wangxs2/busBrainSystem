/* *
 *@method 格式时间戳
 *@param new Date().Format('yyyy-MM-dd hh:mm:ss')
 *@return {String}
 */
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ?
          o[k] :
          ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};


/* *
 *@method 获取cookie
 */
function getCookie (name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};


/* *
 *@method 删除cookie
 */
function delCookie (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};


/**
 * auth: weilan
 * github: https://github.com/hql7
 * description: 一个数组操作函数库
 * date：2019-01-22
 */

"use strict";
import Vue from "vue";
import dayjs from 'dayjs' // 导入日期js

// 从树形数据中递归筛选目标值
function valInDeep (arr = [], val, id, childs) {
  return arr.reduce((flat, item) => {
    return flat.concat(item[id] == val ? item : valInDeep(item[childs] || [], val, id, childs));
  }, []);
}

// 将树形数据向上将此支线递归为一维数组
function flattenDeepParents (arr, parent) {
  return arr.reduce((flat, item) => {
    return flat.concat(item[parent] || [], item[parent] ? flattenDeepParents([item[parent]], parent) : []);
  }, []);
}

// 根据条件递归祖先元素
function regDeepParents (row, parent, cb) {
  if (row[parent]) {
    cb && cb(row[parent]);
    regDeepParents(row[parent], parent, cb);
  }
}

/**
 * 将树形数据向下递归为一维数组
 * @param {*} arr 数据源
 * @param {*} childs  子集key
 */
function flattenDeep (arr = [], childs = "Children") {
  return arr.reduce((flat, item) => {
    return flat.concat(
      item,
      item[childs] ? flattenDeep(item[childs], childs) : []
    );
  }, []);
}

/**
 * 深拷贝
 * @param {*} source 要拷贝的数据
 */
function deepClone (source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "shallowClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = source[keys].constructor === Array ? [] : {};
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * 筛选出数组中最大值
 * @param {*} arr 数据
 * @param {*} key 如果是复杂型数组，请指定字段key
 * @param {*} stamp 如果是时间格式，请设置以转化时间戳
 */
function getMax (arr = [], key = null, stamp = false) {
  let _o = !key ? arr : arr.map(i => i[key]);
  let _t = !stamp ? _o : _o.map(i => dayjs(i).valueOf());
  return Math.max(..._t);
}

/**
 * 筛选出数组中最小值
 * @param {*} arr 数据
 * @param {*} key 如果是复杂型数组，请指定字段key
 * @param {*} stamp 如果是时间格式，请设置以转化时间戳
 */
function getMin (arr = [], key = null, stamp = false) {
  let _o = !key ? arr : arr.map(i => i[key]);
  let _t = !stamp ? _o : _o.map(i => dayjs(i).valueOf());
  return Math.min(..._t);
}

function deepChangeObject (data) {
  let tmp = [];
  Array.from(data).forEach(function (record) {
    Vue.set(record, "_level", _level);
    Vue.set(record, "_parents", _parents);

    Vue.set(record, "_level", _level);
    if (record.startDate && record.endDate) {
      let days = dayjs(record.endDate).diff(dayjs(record.startDate), 'day');
      Vue.set(record, "_duration", days);
    }
    if (record.startDate) {
      Vue.set(record, "_old_startDate", record.startDate);
    }
    if (record.endDate) {
      Vue.set(record, "_old_endDate", record.endDate);
    }
    // 如果有父元素
    if (parent) {
      Vue.set(record, "_parent", parent);
    }
    tmp.push(record);
    if (record[children] && record[children].length > 0) {
      deepChangeObject(record[children], children, record, _level);
    }
  });
  return tmp;
}

function isYestday (time) {
  let timeNew = new Date().getTime()
  var timeDiffer = timeNew - time; //与当前时间误差
  if (timeDiffer >= 24 * 60 * 60 * 1000 && timeDiffer <= 2 * 24 * 60 * 60 * 1000) {
    return true
  } else {
    return false
  }
}
function isYear (time) {
  let timeNew = new Date().getTime()
  let timeing = new Date(timeNew).Format("yyyy-MM-dd hh:mm:ss");
  let timed = new Date(time).Format("yyyy-MM-dd hh:mm:ss");
  if (timeing.substr(0, 4) == timed.substr(0, 4)) {
    return true
  } else {
    return false
  }
}
function timeChange (timeValue) {
  let timeNew = new Date().getTime()
  let date = new Date(timeValue)
  let time = date.getTime()
  var timeDiffer = timeNew - time; //与当前时间误差
  var returnTime = '';
  if (timeDiffer <= 60000) { //一分钟内
    var returnTime = '刚刚 ';
  } else if (timeDiffer > 60000 && timeDiffer < 3600000) { //1小时内
    var returnTime = Math.floor(timeDiffer / 60000) + '分钟前';
  } else if (timeDiffer >= 3600000 && timeDiffer <= 86400000) { //今日
    var returnTime = timeValue.substr(11, 5);
  } else if (isYestday(time) === true && isYear(time) === true) { //昨天
    var returnTime = '昨天 ' + timeValue.substr(11, 5);
  } else if (isYestday(time) === false && isYear(time) === true) { //今年
    var returnTime = timeValue.substr(5, 11);
  } else if (isYestday(time) === false && isYear(time) === false) { //不属于今年
    var returnTime = timeValue.substr(0, 11);
  }
  return returnTime;
}




export {
  flattenDeep, // 将树转化为一维数组
  deepClone, // 深拷贝
  getMax, // 获取最大值
  getMin, // 获取最小值
  valInDeep, // 递归查找
  flattenDeepParents, // 向上将树转化为数组
  regDeepParents, // 根据条件查找父级树
  getCookie,
  delCookie,
  isYestday, // 判断时间是否是昨天
  isYear, // 判断是否是今年
  timeChange // 时间差值判断
}
