import React from 'react';
import { Input, Button } from 'antd';
import css from './index.less';
import userApi from 'api/userApi';
import Utils from 'common/utils';

class Login extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  async login() {
    const { username, password } = this.state;
    let res = await userApi.login({username, password});

    if (res.token) {
      Utils.setToken(res.token);
      window.location = `${window.CFG.__publicPath__}/index.html`;
    }
  }

  render() {

    const inputs = [
      {
        key: 'username',
        type: 'text',
        label: '用户名：',
        placeholder: '请输入用户名！',
        onChange: (val) => {
          this.setState({
            username: val,
          });
        },
      },
      {
        key: 'password',
        type: 'password',
        label: '用户名：',
        placeholder: '请输入密码！',
        onChange: (val) => {
          this.setState({
            password: val,
          });
        },
      },
    ];

    return (
      <div className={css.layout}>
        <div className={css.content}>
            {
              inputs.map(input => {

                const props = {
                  value: this.state[input.key],
                  placeholder: input.placeholder,
                  type: input.type,
                  onChange: (e) => {
                    input.onChange(e.target.value);
                  }
                };

                return (
                  <div className={css.item} key={`input_${input.key}`}>
                    <Input {...props}/>
                  </div>
                );
              })
            }
          <Button onClick={this.login.bind(this)}>提交</Button>
        </div>
      </div>
    );
  }
}

export default Login;