import React from 'react';
import Loadable from 'react-loadable';
import {Spin} from 'antd';

const loading = () => (
  <Spin size="large" style={{width: '100%', margin: '40px 0'}}/>
);

const lazyComponent = (path) => {
  return Loadable({
    loader: () => import(`pages/${path}`),
    loading,
  });
};


const routeData = [
  {
    key: 'home',
    label: '首页',
    // noSideShow: true,  // 不再左边显示
    path: '/',
    desc: '首页',
    component: lazyComponent('home'),
    isAuth: true,
  },
  {
    key: 'customer',
    label: '会员管理',
    // noSideShow: true,  // 不再左边显示
    path: '/customer',
    desc: '会员管理的页面',
    component: lazyComponent('customer'),
    isAuth: true,
  },
  {
    key: 'user',
    label: '用户管理',
    // noSideShow: true,  // 不再左边显示
    path: '/user',
    desc: '用户管理的页面',
    component: lazyComponent('user'),
    isAuth: true,
  },
];

export default routeData;