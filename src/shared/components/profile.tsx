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
import { Dropdown, Select, Space } from 'antd';
import { LogoutOutlined, LockOutlined } from '@ant-design/icons';
import { LOCALES, toImg } from '@/shared/constants';

export const Profile = () => {
  const items = [
    {
      key: 'modify-password',
      label: 'Modify Password',
      icon: <LockOutlined />,
      onClick: () => {
        nx.$modal.present('modify-password');
      }
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: async () => {
        await nx.$api.logout();
        nx.$set('auth.session', nx.NIL);
        nx.navigate('/login');
      }
    }
  ] as any;

  const profile = nx.$get('auth.profile');
  const language = nx.$use('app.language');
  if (!profile) return null;
  const { nickname, username, avatar } = profile;
  const avatarURL = toImg(avatar);

  return (
    <Space>
      <Select
        defaultValue={language}
        style={{ width: 120, display: 'none' }}
        options={LOCALES}
        onChange={(e) => nx.$set('app.language', e)}
      />
      <Dropdown menu={{ items }}>
        <div className="flex items-center">
          <img src={avatarURL} className="w-8 h-8 rounded-full" />
          <span className="mx-2">
            {nickname} ({username})
          </span>
          <span className="cursor-pointer">
            <i className="anticon anticon-user" />
          </span>
        </div>
      </Dropdown>
    </Space>
  );
};
