import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import Utils from 'common/utils';

class AuthRoute extends React.Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    exact: PropTypes.bool,
  };

  static defaultProps = {
    exact: true,
  };

  render() {
    const { component, ...other } = this.props;


    // todo 授权路由
    // if () {
    //   return (
    //     <Route {...other} render={() => <Redirect to="/login.html"/>}/>
    //   );
    // }


    return (
      <Route {...other} component={component}/>
    );

  }
}

export default AuthRoute;