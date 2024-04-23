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
import { Table, Space, Button, Input } from 'antd';
import { BaseList } from '@/shared/base/base-list';
import Header from './_header';
import { ReactNode } from 'react';

export default class extends BaseList {
  resources = 'product_delivery_orders';
  createAble = false;
  loadingAble = false;

  private searchData: any;

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
      { key: 'courier', options: { width: 100 } },
      { key: 'waybill', options: { width: 100 } },
      { key: 'cod', options: { width: 100 } },
      { key: 'remark', options: { width: 150 } }
    ]);
  }

  get actions() {
    return {
      title: 'Actions',
      width: 160,
      fixed: 'right',
      render: (_, record) => {
        const { waybill } = record;
        return (
          <Button disabled={!waybill} icon="🛳" size="small" onClick={this.handleTrace.bind(null, record)}>
            Trace
          </Button>
        );
      }
    };
  }

  view(inProps) {
    const { loading } = this.state;
    const superView = super.view({ ...inProps, loading, scroll: { x: 2100 } });
    return (
      <div className="view">
        <Header ctx={this} />
        {superView}
      </div>
    );
  }

  handleDispatch = (record) => {
    nx.$modal.present('input-courier', record);
  };

  handleOrderCreate = () => {
    nx.$modal.present('product-delivery-order-batch-dispatch');
  };

  handleTrace = (record) => {
    nx.$modal.present('product-delivery-order-trace', record);
  };

  handleSearch = () => {
    this.load(this.searchData);
  };
}
