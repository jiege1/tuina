import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import routeData from 'common/const/route';
import Page404 from 'pages/404';
import ajax from 'common/utils/ajax';
import Layout from 'components/layout';

class Routers extends React.Component {

  componentDidMount() {
    // 验证token
    // ajax.query({
    //   url: 'user.checkToken',
    //   method: 'post',
    // });
  }

  render() {
    return (
      <div>
        <Router>
          <Layout>
            <Switch>
              {
                routeData.map(item => {
                  const props = {
                    key: `route_${item.key}`,
                    path: item.path,
                    component: item.component,
                    exact: true,
                  };

                  // 需要登陆授权的路由
                  // if (item.isAuth) {
                  //   return (
                  //     <AuthRoute {...props}/>
                  //   );
                  // }
                  return (
                    <Route {...props}/>
                  );
                })
              }
              <Route component={Page404}/>
            </Switch>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default Routers;