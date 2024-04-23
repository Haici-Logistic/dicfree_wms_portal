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
import { useEffect } from 'react';

// {
//     "id": 1,
//     "collectionNoVirtual": "00001",
//     "collectionNoReal": "",
//     "arrivingDate": "2023-09-08 12:03:11",
//     "inboundCount": 0,
//     "totalCount": 6
// },

const ResourceTableDetail = (props) => {
  const { id } = props;
  const { ts } = nx.$use('app');
  const qyResource = useQuery(
    ['product_arrival_orders_done_calc_list', ts, id],
    () => nx.$api.product_arrival_orders_done_calc_list({ id }),
    { enabled: !!id }
  );
  const dataSources = qyResource.data || [];
  const columns = nx.antColumn([
    'id',
    { key: 'productSkuCode', title: 'MallSKUCode' },
    { title: 'Actual', key: 'totalCount' }
  ]);

  return (
    <Table
      size="small"
      bordered
      loading={qyResource.isLoading}
      // no pagination
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
