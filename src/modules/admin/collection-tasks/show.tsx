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
import { Card, Space, Tag } from 'antd';
import { useParams } from 'react-router-dom';

export default (props) => {
  const params = useParams();
  const qyResource = useQuery(['collection_tasks', params.id], () =>
    nx.$api.collection_tasks_show(params)
  );

  const data = qyResource.data || { deliveryToArray: [], boxDeliveryOrderList: [] };

  return (
    <Card loading={qyResource.isLoading} size="default" bordered title="CollectionTasks">
      <Space direction="vertical">
        <Space>
          <strong>CollectionNoReal: </strong>
          <span>{data.collectionNoVirtual}</span>
        </Space>
        <Space>
          <strong>Departure Date: </strong>
          <span>{data.departureDate}</span>
        </Space>
        <Space>
          <strong>Deliver To: </strong>
          <span>
            {data.deliveryToArray.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </span>
        </Space>
        <Space>
          <strong>Box Deliver Order:</strong>
          <span>
            {data.boxDeliveryOrderList.map((item) => (
              <Tag key={item.id}>{item.thirdOrderNo}</Tag>
            ))}
          </span>
        </Space>
      </Space>
    </Card>
  );
};

export const Routes = {
  path: 'show/:id'
};
