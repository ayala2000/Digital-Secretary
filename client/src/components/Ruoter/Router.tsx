import React, { useState } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import {  Link } from 'react-router-dom';
import App from '../../App';
import '../../index.css';
import '../../App.css';

const { Sider, Content } = Layout;

const Appss: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
   
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1" icon={<UserOutlined/>}>
              <Link to="/">Logon</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
              <Link to="/addTurn">Add Turn</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined/>}>
              <Link to="/turns">My Turns</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 1000,
              background: colorBgContainer,
            }}
          >
          <App/>
          </Content>
        </Layout>
      </Layout>
   
  );
};

export default Appss;