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
import { BaseList } from '@/shared/base/base-list';
import { toImg } from '@/shared/constants';
import { Space, Avatar, message, Divider } from 'antd';
import { AcSwitch } from '@jswork/antd-components';

export default class extends BaseList {
  resources = 'users';
  action = 'index';
  searchable = true;

  get fields() {
    return nx.antColumn([
      { key: 'id' },
      { key: 'username' },
      { key: 'nickname' },
      { key: 'roleNames' },
      { key: 'avatar', callback: this.renderAvatar }
    ]);
  }

  get actions() {
    return {
      title: 'Actions',
      width: 520,
      render: (_, record) => {
        return (
          <Space>
            <a onClick={this.resetPwd.bind(null, record)}>Reset Password</a>
            <Divider type="vertical" />
            <a onClick={this.bindPrinter.bind(null, record)}>Bind Printer</a>
            <Divider type="vertical" />
            <a onClick={this.bindPda.bind(null, record)}>Bind PDA</a>
            <Divider type="vertical" />
            <a onClick={this.edit}>Edit</a>
            <Divider type="vertical" />
            <AcSwitch
              size="small"
              checkedChildren="Enabled"
              unCheckedChildren="Disabled"
              value={record.enabled}
              onChange={this.toggleUser.bind(this, record)}
            />
          </Space>
        );
      }
    };
  }

  renderAvatar(_, record) {
    const url = toImg(record.avatar);
    return <Avatar src={url} size="large" />;
  }

  bindPrinter = (item) => {
    nx.$modal.present('add-printer', item);
  };

  bindPda = (item) => {
    nx.$modal.present('add-pda', item);
  };

  toggleUser = async (inRecord) => {
    const { enabled } = inRecord;
    const { id } = inRecord;
    const action = enabled ? 'disable' : 'enable';
    await nx.$api[`users_${action}`]({ id });
    this.refresh();
    message.success(`User ${action} success!`);
  };

  resetPwd = async (inRecord) => {
    nx.$modal.present('user-reset-pwd', inRecord);
  };
}
