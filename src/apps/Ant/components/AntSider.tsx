import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Layout, Menu, Icon, Typography, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import '../styles/sider.css';

import Logo from '../../../components/svg/Logo';
import { ReduxState } from '../../../redux/reducers';
import { logout } from '../../../redux/actions/auth';

const { Title } = Typography;
const { Sider } = Layout;

const Brand = styled.div`
  height: 32px;
  margin: 16px;
  padding-left: 8px;
  display: flex;
  overflow: hidden;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface OwnProps {
  collapsed: boolean;
}

type Props = OwnProps;

const keyMap = {
  '1': '/',
  '2': '/draft',
  '3': '/test-styleguide',
  '4': '/launch-darkly',
};

const locationToKey = (location) => {
  const activeKey = Object.keys(keyMap).find((key) => keyMap[key] === location.pathname) ?? '';
  return [activeKey];
};

const AntSider = ({ collapsed }: Props) => {
  const handleReset = () => {
    localStorage.setItem(window.storageKey, '{}');
    window.location.href = window.location.origin;
  };
  const location = useLocation();

  const storageItems = JSON.parse(localStorage.getItem(window.storageKey) || '');

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="candu-ant-sider">
      <Link to="/">
        <Brand>
          <Logo style={{ fill: '#e0e0e0', flexShrink: 0 }} />
          {!collapsed && (
            <Title level={4} style={{ color: '#e0e0e0', marginLeft: 8, paddingTop: 2 }}>
              Steamery
            </Title>
          )}
        </Brand>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={locationToKey(location)}
        style={{ flex: '1 1', display: 'flex', flexDirection: 'column' }}
      >
        <Menu.Item key="1">
          <Link to="/">
            <Icon type="laptop" />
            <span>Resource center</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/draft">
            <Icon type="mail" />
            <span>Draft</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/test-styleguide">
            <Icon type="database" />
            <span>Test Styleguide</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/launch-darkly">
            <Icon type="database" />
            <span>Launch Darkly</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="upload" />
          <span>Documents</span>
        </Menu.Item>
        <div style={{ flex: '1 1' }} />
        {(storageItems?.clientToken || storageItems?.userId || storageItems?.sdkVersion) && (
          <div style={{ lineHeight: '26px', padding: '0px 16px' }} key="6">
            <Flex>
              <small>Client Token:</small>
              <strong>{storageItems.clientToken || '-- --'}</strong>
            </Flex>
            <Flex>
              <small>User Id:</small>
              <strong>{storageItems.userId || '-- --'}</strong>
            </Flex>
            <Flex>
              <small>SDK Version:</small>
              <strong>{storageItems.sdkVersion || '-- --'}</strong>
            </Flex>

            <Button
              style={{ width: '100%', margin: '5px auto 15px' }}
              type="primary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        )}
      </Menu>
    </Sider>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AntSider);
