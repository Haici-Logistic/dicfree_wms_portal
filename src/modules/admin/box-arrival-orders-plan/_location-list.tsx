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
import { Card, Col, Row, Space } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { UnorderedListOutlined } from '@ant-design/icons';
import Item from './_item';
import { useEffect } from 'react';

export default () => {
  const ts = nx.$use('app.ts');
  const qyLocationList = useQuery(['arrival_orders_location_list'], nx.$api.arrival_orders_location_list, {
    onSuccess: (e) => nx.$set('boxArrivalOrders.locationList', e)
  });
  const groupedLocationList = nx.$get('boxArrivalOrders.groupedLocationList');

  return (
    <Card
      loading={qyLocationList.isLoading}
      title={
        <Space>
          <UnorderedListOutlined />
          <span>Location List</span>
        </Space>
      }>
      <div className="flex flex-row">
        {groupedLocationList.map((item) => {
          const span = 24 / item.items.length;
          return (
            <div className="flex-1 p-3 border-gray-200 border-solid border-1" key={item.key}>
              <Row gutter={5}>
                {item.items.map((subitem) => {
                  return (
                    <Col key={subitem.key} span={span} className="flex flex-col gap-2">
                      {subitem.items.map((dateitem) => {
                        return <Item key={dateitem.code} model={dateitem} canSelect />;
                      })}
                    </Col>
                  );
                })}
              </Row>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
