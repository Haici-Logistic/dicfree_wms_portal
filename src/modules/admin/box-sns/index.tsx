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
import { Button, Space } from 'antd';
import { ReloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { BaseList } from '@/shared/base/base-list';

export default class extends BaseList {
  resources = 'box_sns';
  action = 'index';

  get fields() {
    return nx.antColumn([
      { title: 'Id', key: 'id' },
      { title: 'code', key: 'boxSnCode' },
      { key: 'boxSkuCode', title: 'BoxSKUCode' },
      { title: 'serialNo', key: 'serialNo' },
      { title: 'pcs', key: 'pcs' },
      { title: 'supplierBoxSnCode', key: 'supplierBoxSnCode' }
    ]);
  }

  get options() {
    const { boxSkuCode } = this.qs;
    return { boxSkuCode };
  }

  get actions() {
    return null;
  }

  get extraView() {
    return (
      <Space>
        <Button size="small" onClick={this.goBack}>
          <ArrowLeftOutlined />
          Back
        </Button>
      </Space>
    );
  }

  goBack = () => {
    history.back();
  };
}
