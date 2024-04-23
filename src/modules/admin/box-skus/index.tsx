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
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { ReloadOutlined } from '@ant-design/icons';

export default class extends BaseList {
  resources = 'box_skus';
  action = 'index';

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

  get fields() {
    return nx.antColumn([
      { title: 'Id', key: 'id' },
      { key: 'code' },
      { title: 'supplierBoxCode', key: 'supplierBoxCode' },
      { title: 'supplier', key: 'supplier' },
      { title: 'pickUpCode', key: 'pickUpCode' },
      { title: 'location', key: 'location' },
      { title: 'sortingTo', key: 'sortingTo' }
    ]);
  }

  get actions() {
    return {
      title: 'Actions',
      width: 130,
      render: (_, record) => {
        return (
          <Space>
            <Link to={`/admin/box-sns?boxSkuCode=${record.code}`}>BoxSKU & BoxSN</Link>
          </Space>
        );
      }
    };
  }

  view(inProps) {
    const superView = super.view(inProps);
    const token = nx.$get('auth.token');
    const { batchNo } = nx.$get('app');

    return (
      <div className="view">
        <div className="mb-2 flex justify-between gap-2">
          <Space>
            <a
              download="BoxSkuBatchAdd"
              target="_blank"
              href="/assets/templates/SkuSupplierBatchAdd.xlsx">
              🔗 BoxSkuBatchAdd
            </a>
            <a
              download="BoxSkuBatchEdit"
              target="_blank"
              href="/assets/templates/SkuSupplierBatchEdit.xlsx">
              🔗 BoxSkuBatchEdit
            </a>
          </Space>
          <Space>
            <Button size="small" icon={`➕`} onClick={this.handleSkuCreate}>
              Batch Add
            </Button>
            <Button size="small" icon={`✍️`} onClick={this.handleSkuEdit}>
              Batch Edit
            </Button>
            <Button
              disabled={!batchNo}
              icon={`🌈`}
              size="small"
              target="_blank"
              href={`/api/ads/boxSku/download?access_token=${token}&batchNo=${batchNo}`}>
              Export Recent
            </Button>
            <Button
              icon={`🌏`}
              size="small"
              target="_blank"
              href={`/api/ads/boxSku/downloadAll?access_token=${token}`}>
              Export All
            </Button>
          </Space>
        </div>
        {superView}
      </div>
    );
  }

  toSnList = (item) => {
    nx.navigate(`/admin/sns?boxSkuCode=${item.boxSkuCode}`);
  };

  handleSkuCreate = () => {
    nx.$modal.present('sku-batch-create');
  };

  handleSkuEdit = () => {
    nx.$modal.present('sku-batch-edit');
  };
}
