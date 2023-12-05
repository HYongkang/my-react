import React, { useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import routes from './routes';
import './App.css';


const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children, path, type) {
  return {
    key,
    icon,
    children,
    label,
    path,
    type,
  };
}

const menuItems = [
  getItem('调度平台', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('规则引擎', 'rule', <MailOutlined />, [
    getItem('左因子表', '/rule/LeftFactor', null, null, '/rule/LeftFactor'),
    getItem('右因子表', '/rule/RightFactor', null, null, '/rule/RightFactor'),
    getItem('左因子关联表', '/rule/LeftRelate', null, null, '/rule/LeftRelate'),
    getItem('右因子关联表', '/rule/RightRelate', null, null, '/rule/RightRelate')
  ]),
  getItem('控制中心', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const gotoRoute = (key) => {
    navigate(key, {replace: true});
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
          onSelect={item => gotoRoute(item.key)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            {routes.filter(({ path }) => path !== '/').map(route => (
              route.children ? (
                  route.children.map(childItem => (
                    <Route key={childItem.path} exact path={childItem.path} Component={childItem.component} />
                  ))
              ) : (
                <Route key={route.path} exact path={route.path} Component={route.component} />
              )
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;