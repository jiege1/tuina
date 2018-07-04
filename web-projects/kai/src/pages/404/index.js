import React from 'react';
import PropTypes from 'prop-types';

export default class Page404 extends React.Component {

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
      <div>
        404 not find!
      </div>
    );
  }
}