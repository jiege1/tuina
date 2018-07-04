import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import {connect} from 'react-redux';
import css from './index.less';

export default class Home extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    // this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={css.layout}>
        <h1>Welcome !</h1>
      </div>
    );
  }
}