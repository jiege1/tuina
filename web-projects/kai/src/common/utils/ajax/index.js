import axios from 'axios';
import Utils from 'common/utils';
import {message} from 'antd';

/**
 * Ajax.query({url, params, method = 'get'})
 *
 */
export default class Ajax {

  static query({url, params = {}, method = 'get', successLabel = null}) {

    const api = eval(`CFG.api.${url}`);
    const token = Utils.getToken();

    params = {
      ...params,
      token,
    };

    if (method === 'get') {
      params = {params};
    }

    return axios[method](api, params).then(res => {
      const {data, code, msg} = res.data;
      return new Promise((resolve, reject) => {

        // 部分处理
        switch (parseInt(code)) {
          case 10000: {
            // 登陆即将超时，msg为新token
            Utils.setToken(msg);
            break;
          }
          case 10001: {
            // 登陆超时
            Utils.delToken();
            alert('登陆超时，请重新登陆！');
            window.location = `${window.CFG.__publicPath__}/login.html`;
            break;
          }
        }

        if (code <= 10000) {
          resolve(data);

          // mock.bool 类型的response提示信息
          if (successLabel) {
            if (data.success) {
              message.success(`${successLabel}成功！`);
            } else {
              message.error(`${successLabel}失败！`);
            }
          }
        } else {
          reject(data);
        }


      }).catch(err => {
        console.log('err', err);
      });
    });
  }
}