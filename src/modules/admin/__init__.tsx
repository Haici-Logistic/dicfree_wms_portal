/**
 * Copyright 2024 Wuhan Haici Technology Co., Ltd 
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Button, Layout, Menu, Popover, Row, Space } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import ReactKbar from '@jswork/react-kbar';
import { Logo } from '@/shared/components/logo';
import { Footer } from '@/shared/components/footer';
import { KB_ACTIONS } from '@/shared/constants';
import { Breadcrumbs } from '@/shared/components/breadcrumb';
import { getActiveKeys, getOpenKeys } from '@/shared/helpers';
import { useAudio } from '@/shared/hooks/use-audio';
import { useHotKeys } from '@/shared/hooks/use-hot-keys';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useStateProxy } from '@/shared/hooks/use-state-proxy';
import { Profile } from '@/shared/components/profile';

const { Content, Sider } = Layout;

export default () => {
  const navigate = useNavigate();
  const { collapsed } = nx.$use('layout');
  const { session } = nx.$use('auth');
  const pathname = location.hash.slice(1);
  const state = useStateProxy({ menus: [], activeKeys: [], openKeys: [] });
  const qyProfile = useQuery<[KeyIsString, any[]]>(['profile', 'menu', session], () =>
    Promise.all([nx.$api.profile(), nx.$api.menu()])
  );

  // useAudio
  useAudio();

  useHotKeys();

  // init profile
  useEffect(() => {
    const currentModule = nx.$get('app.currentModule');
    if (!qyProfile.data) return;
    const [profile, menus] = qyProfile.data;
    nx.$set('auth.profile', profile);
    nx.$call('app.updateTs');

    state.menus = menus;
    state.activeKeys = getActiveKeys(pathname, menus);
    state.openKeys = getOpenKeys(pathname, menus);
    nx.$event.emit(`${currentModule}.refreshState`);
  }, [qyProfile.data, pathname]);

  return (
    <ReactKbar actions={KB_ACTIONS}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          width={240}
          collapsed={collapsed}
          onCollapse={(value) => {
            nx.$set('layout.collapsed', value);
          }}>
          <Logo />
          {state.menus.length > 0 && (
            <Menu
              className="sticky top-0"
              theme="dark"
              openKeys={state.openKeys}
              selectedKeys={state.activeKeys}
              items={state.menus}
              mode="inline"
              onOpenChange={(e) => (state.openKeys = e)}
              onClick={(e) => {
                navigate(e.key);
                state.activeKeys = getActiveKeys(e.key, state.menus);
              }}
            />
          )}
        </Sider>
        {qyProfile.data && (
          <Layout className="site-layout bg-white">
            <Row style={{ padding: '10px 16px' }} align="middle" justify="space-between">
              <Breadcrumbs />
              <Space>
                <Profile />
              </Space>
            </Row>
            <Content className="relative" style={{ margin: '0 16px' }}>
              <Outlet />
            </Content>
            <Footer />
          </Layout>
        )}
      </Layout>
    </ReactKbar>
  );
};
