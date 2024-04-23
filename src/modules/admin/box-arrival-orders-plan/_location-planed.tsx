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
import styled from 'styled-components';
import { Row, Col, Card, Space, Empty, Button, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import LocationPlanedItem from './_location-planed-item';
import Selector from './_selector';
import { Fragment } from 'react';
import { useMutation } from '@tanstack/react-query';

export default () => {
  const selectedPlan = nx.$use('boxArrivalOrders.selectedPlan');
  const wholeItems = nx.$get('boxArrivalOrders.wholeItems');
  const bulkItems = nx.$get('boxArrivalOrders.bulkItems');
  const mtSubmit = useMutation(
    () => {
      const { id } = selectedPlan;
      const payload = {
        id,
        wholeLocation: wholeItems.map((item) => item.code).join(','),
        bulkLocation: bulkItems.map((item) => item.code).join(',')
      };
      return nx.$api.arrival_orders_location_lock(payload);
    },
    {
      onSuccess: (res) => {
        const errorCode = nx.get(res, 'errorCode');
        console.log('data:', res, errorCode);
        if (!errorCode) message.success('Location planning saved success!');
      }
    }
  );

  const handleConfirm = async () => {
    await mtSubmit.mutateAsync();
  };

  return (
    <Card
      title={
        <Space>
          <CheckCircleOutlined />
          <span>Location Planning</span>
        </Space>
      }
      extra={<Selector />}>
      <nx.ife value={selectedPlan}>
        <Fragment>
          <Row gutter={10}>
            <Col span={12}>
              <LocationPlanedItem items={wholeItems} locKey="whole" title="Whole Location" />
            </Col>
            <Col span={12}>
              <LocationPlanedItem items={bulkItems} locKey="bulk" title="Bulk Location" />
            </Col>
          </Row>
          <Row gutter={10} className="mt-2">
            <Col span={24} className="flex justify-end">
              <Button
                type="primary"
                disabled={mtSubmit.isLoading || (wholeItems.length === 0 && bulkItems.length === 0)}
                loading={mtSubmit.isLoading}
                onClick={handleConfirm}>
                Confirm
              </Button>
            </Col>
          </Row>
        </Fragment>
        <Empty />
      </nx.ife>
    </Card>
  );
};
