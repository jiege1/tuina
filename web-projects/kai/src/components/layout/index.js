import React from 'react';
import classnames from 'classnames';
import { Layout as AntdLayout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import routeData from 'common/const/route';
import GlobalFooter from 'components/footer';
const { Header, Footer, Sider, Content } = AntdLayout;
import css from './index.less';

@withRouter
class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  componentDidMount() {
    this.setSelected(window.location.hash);
  }

  componentDidUpdate() {
    this.setSelected(this.props.location.pathname);
  }

  setSelected(path) {
    let nextSelect = 'home';
    const pathArr = path.split('/');
    if (pathArr[pathArr.length - 1] && pathArr[pathArr.length - 1].length) {
      nextSelect = pathArr[pathArr.length - 1];
    }
    if (this.state.selected !== nextSelect) {
      this.setState({
        selected: nextSelect,
      });
    }
  }

  render() {
    const cls = classnames([css.layout]);

    const menuProps = {
      theme: 'dark',
      selectedKeys: [this.state.selected],
      style: {
        width: 150
      },
      mode: 'inline',
      onClick: ({item, key}) => {
        this.setState({
          selected: key,
        });
      }
    };
    return (
      <AntdLayout className={cls}>
        <Sider className={css.sider} width={150}>
          <div className={css.logo}>
            这是logo
          </div>
          <Menu {...menuProps}>
            {
              routeData.map(item => {

                if (item.noSideShow) {
                  return null;
                }

                return (
                  <Menu.Item key={item.key}>
                    <Link to={item.path}>{item.label}</Link>
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Sider>
        <AntdLayout>
          <Header className={css.header}>Header</Header>
          <Content className={css.content}>
            {this.props.children}
          </Content>
          <Footer>
            <GlobalFooter />
          </Footer>
        </AntdLayout>
      </AntdLayout>
    );
  }
}
export default Layout;
