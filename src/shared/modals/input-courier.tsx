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
import { Modal, Row, Col, Button, Space, message } from 'antd';
import { FormBuilder } from '@jswork/antd-form-builder';
import { COURIER_TYPES } from '@/shared/constants';
import { useMutation } from '@tanstack/react-query';

export default (props) => {
  const { visible, data } = nx.$modal.value('input-courier');
  const mtDispatch = useMutation(nx.$api.product_delivery_orders_dispatch);
  const meta = {
    initValues() {
      return { username: data?.username };
    },
    fields: [
      {
        key: 'courier',
        label: 'courier',
        widget: 'ac:select',
        required: true,
        widgetProps: { items: COURIER_TYPES }
      },
      { key: 'waybill', label: 'waybill' }
    ]
  };

  const handleFinish = async (e) => {
    const { id } = data;
    await mtDispatch.mutateAsync({ id, ...e });
    message.success('Dispatch success!');
    nx.$modal.dismissAll();
  };

  return (
    <Modal
      open={visible}
      footer={null}
      title={<span className="capitalize">input-courier</span>}
      onCancel={nx.$modal.dismissAll}
      closable>
      <FormBuilder meta={meta} slim onFinish={handleFinish}>
        <Row>
          <Col span={8}></Col>
          <Col span={16} className="text-right">
            <Space>
              <Button
                disabled={mtDispatch.isLoading}
                loading={mtDispatch.isLoading}
                type="primary"
                htmlType="submit">
                Submit
              </Button>
              <Button onClick={nx.$modal.dismissAll}>Cancel</Button>
            </Space>
          </Col>
        </Row>
      </FormBuilder>
    </Modal>
  );
};
