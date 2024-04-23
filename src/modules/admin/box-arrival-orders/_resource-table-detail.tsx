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
import { Table, Space, Button } from 'antd';
import dayjs from 'dayjs';
import noop from '@jswork/noop';
import { buildDownloadURL } from '@/shared/helpers';
import { Link } from 'react-router-dom';

// {
//     "id": 1,
//     "collectionNoVirtual": "00001",
//     "collectionNoReal": "",
//     "arrivingDate": "2023-09-08 12:03:11",
//     "inboundCount": 0,
//     "totalCount": 6
// },

const ResourceTableDetail = (props) => {
  const currentId = nx.$use('boxArrivalOrders.currentId');
  const qyResource = useQuery(
    ['arrival_orders_item_list', currentId],
    () => nx.$api.arrival_orders_item_list({ id: currentId }),
    { enabled: !!currentId }
  );
  const loading = currentId ? qyResource.isLoading : false;
  const dataSources = qyResource.data || [];
  const columns = nx.antColumn([
    'id',
    { key: 'boxSkuCode', title: 'BoxSKUCode' },
    {
      title: 'Undo/Plan',
      callback: (_, record) => {
        const { inboundCount, totalCount } = record;
        const left = totalCount - inboundCount;
        return (
          <span>
            <strong style={{ color: 'red' }}>{left}</strong>/{totalCount}
          </span>
        );
      }
    },
    {
      title: 'Actions',
      callback: (_, record) => {
        const boxArrivalOrderItemId = record.id;
        const params = { id: currentId, boxArrivalOrderItemId };
        const downloadURL = buildDownloadURL('/api/ads/boxArrivalOrder/itemSnDownload', params);
        return (
          <Space>
            <Button size="small" target="_blank" href={downloadURL}>
              Download
            </Button>
          </Space>
        );
      }
    }
  ]);

  return (
    <Table
      size="small"
      bordered
      loading={loading}
      pagination={false}
      dataSource={dataSources}
      columns={columns}
      onRow={(record) => {
        return {
          onClick: props.onRowClick.bind(null, record)
        };
      }}
    />
  );
};

// default props
ResourceTableDetail.defaultProps = {
  onRowClick: noop
};

export default ResourceTableDetail;
