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
import { ReactAntCurdTree } from '@jswork/ant-abstract-main';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';

export class BaseTree extends ReactAntCurdTree {
  module = 'admin';
  size = 'middle';
  rowKey = 'value';
  apiService = nx.$api;
  eventService = nx.$event;
  routeService = {
    push: (to) => nx.navigate(to),
    replace: (to) => nx.navigate(to, { replace: true })
  };

  get extraView() {
    return (
      <Space>
        <Button size={'small'} onClick={this.forceRefresh}>
          <ReloadOutlined />
          <span>{this.t('refresh')}</span>
        </Button>
      </Space>
    );
  }

  dataDidLoad(inResponse: any): any {
    return nx.keyMap(inResponse, {
      id: 'value',
      name: 'label'
    });
  }
}
