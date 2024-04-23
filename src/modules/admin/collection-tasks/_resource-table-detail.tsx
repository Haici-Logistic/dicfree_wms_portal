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
import noop from '@jswork/noop';
import { buildDownloadURL } from '@/shared/helpers';

const ResourceTableDetail = (props) => {
  const id = nx.$use('collectionTasks.currentId');
  const qyResource = useQuery(
    ['collection_tasks_item_list', id],
    () => nx.$api.collection_tasks_item_list({ id }),
    { enabled: !!id }
  );
  const loading = id ? qyResource.isLoading : false;
  const dataSources = qyResource.data || [];
  const columns = nx.antColumn([
    'id',
    'boxSkuCode',
    {
      title: 'Undo/Plan',
      render: (_, record) => {
        const { outboundCount, totalCount } = record;
        const left = totalCount - outboundCount;
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
        const { id: boxDeliveryOrderItemId, boxDeliveryOrderId } = record;
        const params = { id, boxDeliveryOrderItemId, boxDeliveryOrderId };
        const downloadURL = buildDownloadURL('/api/ads/collectionTask/itemSnDownload', params);
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
