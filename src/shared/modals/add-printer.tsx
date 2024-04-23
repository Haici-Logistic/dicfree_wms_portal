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
import { Row, Col, Button, Modal, Space, message } from 'antd';
import { FormBuilder } from '@jswork/antd-form-builder';
import { useMutation } from '@tanstack/react-query';

export default () => {
  const { visible, data } = nx.$modal.value('add-printer');
  const { mutate, isLoading } = useMutation({ mutationFn: nx.$api.printer_bind });

  if (!data) return null;

  const handleFinish = async (e) => {
    await mutate(e);
    nx.$modal.dismissAll();
  };

  const meta = {
    initValues() {
      return { username: data?.username };
    },
    fields: [
      { key: 'username', label: 'username', disabled: true },
      { key: 'sn', label: 'sn', required: true },
      { key: 'key', label: 'key', required: true },
      { key: 'name', label: 'name', required: true },
      { key: 'sim', label: 'sim' }
    ]
  };

  return (
    <Modal
      open={visible}
      title={<span className="capitalize">Add PDA</span>}
      closable={false}
      footer={null}>
      <FormBuilder meta={meta} slim onFinish={handleFinish}>
        <Row>
          <Col span={8}></Col>
          <Col span={16} className="text-right">
            <Space>
              <Button disabled={isLoading} loading={isLoading} type="primary" htmlType="submit">
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
