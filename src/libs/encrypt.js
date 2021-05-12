import CryptoJS from "crypto-js"

let id = [10, 15, 13, 8, 6, 4, 0, 1, 14, 5, 2, 7, 3, 9, 12, 11];

function rank(key) {
  let str = '';
  for (let i = 0; i < id.length; i++) {
    str += key[id[i]]
  }
  return str;
}

function unRank(key) {
  let arr = [];
  for (let i = 0; i < id.length; i++) {
    arr[id[i]] = key[i]
  }
  return arr.join('')
}

export default function (data) {
  //加密
  let O_k = 'b11rt@si1itsioto';
  let O_i = '1649751256384032';
  let key = CryptoJS.enc.Utf8.parse(unRank(O_k));
  let iv = CryptoJS.enc.Utf8.parse(unRank(O_i));
  let encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString(); //返回的是base64格式的密文
}
/* decrypt  解密 */
