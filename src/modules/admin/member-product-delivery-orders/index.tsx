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
import { Space, Button, Table } from 'antd';
import { AcConfirmButton } from '@jswork/antd-components';
import { BaseList } from '@/shared/base/base-list';
import styled from 'styled-components';

export default class extends BaseList {
  resources = 'member_product_delivery_orders';
  createAble = false;

  get fields() {
    return nx.antColumn([
      { key: 'id', options: { width: 50, fixed: 'left' } },
      { key: 'supplier', options: { width: 100, fixed: 'left' } },
      { key: 'createTime', options: { width: 100, fixed: 'left' } },
      { key: 'thirdOrderNo', options: { width: 120, fixed: 'left' } },
      'name',
      'phone1',
      'phone2',
      'province',
      'city',
      {
        key: 'productDeliveryOrderItemList',
        title: 'productDeliveryOrderItemList',
        options: {
          width: 300,
          children: nx.antColumn([
            {
              title: 'MallSKUCode',
              key: 'productSkuCode',
              render: (_, record) => {
                const items = record.productDeliveryOrderItemList;
                return items.map((item) => {
                  return <div className="py-1">{item.productSkuCode}</div>;
                });
              }
            },
            {
              title: 'totalCount',
              key: 'totalCount',
              render: (_, record) => {
                const items = record.productDeliveryOrderItemList;
                return items.map((item) => {
                  return <div className="py-1">{item.totalCount}</div>;
                });
              }
            }
          ])
        }
      },
      { key: 'address', options: { width: 300 } },
      { key: 'waybill', options: { width: 100 } },
      { key: 'cod', options: { width: 100 } },
      { key: 'remark', options: { width: 150 } }
    ]);
  }

  view(inProps) {
    const superView = super.view({ ...inProps, scroll: { x: 2100 } });
    return (
      <div className="view">
        <div className="mb-2 flex justify-between gap-2">
          <Space>
            <a download="OrderBatchAddTemplate" target="_blank" href="/assets/templates/OrderBatchAddTemplate.xlsx">
              🔗 OrderBatchAddTemplate
            </a>
          </Space>
          <Space>
            <Button size="small" icon={`➕`} onClick={this.handleOrderCreate}>
              Batch Add
            </Button>
          </Space>
        </div>
        {superView}
      </div>
    );
  }

  get actions() {
    return {
      title: 'Actions',
      width: 160,
      fixed: 'right',
      render: (_, record) => {
        const { waybill, dispatched } = record;
        if (dispatched) {
          return (
            <Button disabled={!waybill} icon="🛳" size="small" onClick={this.handleTrace.bind(null, record)}>
              Trace
            </Button>
          );
        } else {
          return (
            <AcConfirmButton
              lang="en-US"
              onClick={this.del}
              childProps={{
                danger: true,
                size: 'small',
                type: 'default'
              }}>
              Delete
            </AcConfirmButton>
          );
        }
      }
    };
  }

  handleOrderCreate = () => {
    nx.$modal.present('member-product-delivery-order-batch-add');
  };

  handleTrace = (record) => {
    nx.$modal.present('member-product-delivery-order-trace', record);
  };

  handleInputCourier = () => {
    nx.$modal.present('input-courier');
  };
}
