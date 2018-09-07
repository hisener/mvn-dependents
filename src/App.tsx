import * as React from 'react';
import { Layout, Menu } from 'antd';

import './App.css';
import SearchTree from './SearchTree';

const { Header, Content } = Layout;

class App extends React.Component {
  public render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Maven Dependents</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 96 }}>
          <SearchTree />
        </Content>
      </Layout>
    );
  }
}

export default App;
