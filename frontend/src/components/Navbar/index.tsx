import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import styles from './style.module.css';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const items = [
    { label: <Link to="/">首页</Link>, key: 'home' },
    { label: <Link to="/tasks">任务状态</Link>, key: 'tasks' },
  ];

  return (
    <Header className={styles.navbar}>
      <div className={styles.logo}>3D校园建模平台</div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['home']}
        items={items}
      />
    </Header>
  );
};

export default Navbar;
