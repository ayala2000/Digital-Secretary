import React, { useState } from 'react';
import {
  CalendarFilled,
  CarryOutOutlined,
  FileAddOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import {  Link } from 'react-router-dom';
import App from '../../App';
import '../../index.css';
import '../../App.css';
import { green } from '@mui/material/colors';

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
            <Menu.Item key="2" icon={<CalendarFilled />}>
              <Link to="/addTurn">Add Turn</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CarryOutOutlined />}>
              <Link to="/turns">My Turns</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<QuestionCircleOutlined
 />}>
              <Link to="/blog">About</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '3px 3px',
              padding: 2,
              minHeight: 1000,
              background: '#d5d5d5',
            }}
          >
          <App/>
          </Content>
        </Layout>
      </Layout>
   
  );
};

export default Appss;