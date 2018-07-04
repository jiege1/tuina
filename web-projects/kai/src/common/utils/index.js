
export default class Utils {

  constructor() {
    this.delToken = this.delToken.bind(this);
  }

  static isLocal() {
    return process.env.NODE_ENV === 'development';
  }

  static setToken(token) {
    if (window.localStorage) {
      window.localStorage.setItem('tuinaToken', token);
    } else {
      let exp = new Date();
      exp.setTime(exp.getTime() + 60 * 60 * 1000);
      document.cookie = `tuinaToken=${token};expires=${exp.toGMTString()}`;
    }
  }

  static getToken() {
    let result = null;

    if (window.localStorage) {
      result = window.localStorage.getItem('tuinaToken');
    } else {
      const reg = new RegExp('(^| )tuinaToken=([^;]*)(;|$)');
      const arr = document.cookie.match(reg);
      if (arr[2]) {
        result = arr[2];
      }
    }

    return result;
  }

  static delToken() {
    if (window.localStorage) {
      localStorage.removeItem('tuinaToken');
    } else {
      let exp = new Date();
      exp.setTime(exp.getTime() - 1);
      let token = this.getToken();
      if (token !== null) {
        document.cookie = `tuinaToken=${token};expires=${exp.toGMTString()}`;
      }
    }
  }
}