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
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';
import noop from '@jswork/noop';

const ResourceTable = () => {
  const { session } = nx.$use('auth');
  const qyResource = useQuery(['arrival_orders', session], () => nx.$api.arrival_orders_index());
  const dataSources = qyResource.data?.rows || [];
  const columns = nx.antColumn([
    { key: 'id' },
    {
      title: 'arrivingDate',
      render: (_, record) => dayjs(record.arrivingDate).format('YYYY-MM-DD')
    },
    { key: 'thirdOrderNo' },
    {
      title: 'Undo/Plan',
      render: (_, record) => {
        const { inboundCount, totalCount } = record;
        const left = totalCount - inboundCount;
        return (
          <span>
            <strong style={{ color: 'red' }}>{left}</strong>/{totalCount}
          </span>
        );
      }
    }
  ]);
  const currentId = nx.$use('boxArrivalOrders.currentId');

  useEffect(() => {
    if (qyResource.isFetched && !currentId) {
      nx.$set('boxArrivalOrders.currentId', dataSources[0]?.id);
    }
  }, [qyResource.isFetched, currentId]);

  return (
    <Table
      size="small"
      bordered
      rowClassName={(record) => {
        return record.id === currentId ? 'highlight-row' : '';
      }}
      loading={qyResource.isLoading}
      dataSource={dataSources}
      columns={columns}
      onRow={(record) => {
        return {
          onClick: () => nx.$set('boxArrivalOrders.currentId', record.id)
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
