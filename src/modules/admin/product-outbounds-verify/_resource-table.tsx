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
import { useQuery } from '@tanstack/react-query';
import { Button, Table } from 'antd';
import noop from '@jswork/noop';
import { useEffect } from 'react';

const ResourceTable = (props) => {
  const { id } = props;
  const { ts } = nx.$use('app');
  const qyResource = useQuery(
    ['product-outbounds-verify.list', ts, id],
    () => nx.$api.product_delivery_orders_item_undo_calc_list({ id }),
    { enabled: !!id }
  );
  const dataSources = qyResource.data || [];
  const columns = nx.antColumn([
    'id',
    { key: 'productSkuCode' },
    {
      title: 'Undo/Plan',
      callback: (_, record) => {
        const { verifyCount, totalCount } = record;
        const left = totalCount - verifyCount;
        return (
          <span>
            <strong style={{ color: 'red' }}>{left}</strong>/{totalCount}
          </span>
        );
      }
    },
    {
      title: 'Actions',
      render: (_, record) => {
        return (
          <Button
            onClick={() => {
              const productDeliveryOrderItemId = record.id;
              nx.$modal.present('product-outbound-undo', {
                id,
                productDeliveryOrderItemId
              });
            }}
            size="small">
            undo
          </Button>
        );
      }
    }
  ]);

  return (
    <Table
      size="small"
      bordered
      pagination={false}
      loading={qyResource.isLoading}
      dataSource={dataSources}
      columns={columns}
      rowClassName={(_, index) => {
        return index == 0 ? 'blink-row' : '';
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            return props.onRowClick(record);
          }
        };
      }}
    />
  );
};

// default props
ResourceTable.defaultProps = {
  onRowClick: noop
};

export default ResourceTable;
