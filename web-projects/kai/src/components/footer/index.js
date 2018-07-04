import React from 'react';
import css from './index.less';
import {Icon} from 'antd';

export default class Footer extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {

    return (
      <div className={css.box}>
        Copyright <Icon type="copyright" /> 2018 Created by wj
      </div>
    );
  }
}