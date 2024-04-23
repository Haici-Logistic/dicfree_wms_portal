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
  const { visible, data } = nx.$modal.value('add-pda');
  const mtBind = useMutation({ mutationFn: nx.$api.pda_bind });

  if (!data) return null;

  const handleFinish = async (e) => {
    await mtBind.mutateAsync(e);
    message.success('Bind success!');
    nx.$modal.dismissAll();
  };

  const meta = {
    initValues() {
      return {
        username: data?.username,
        userId: data?.id
      };
    },
    fields: [
      { key: 'username', label: 'username', disabled: true },
      { key: 'userId', label: 'userId', disabled: true },
      { key: 'name', label: 'name', required: true },
      { key: 'code', label: 'code', required: true },
      { key: 'key', label: 'key', required: true },
      { key: 'shelfAreaCode', label: 'shelfAreaCode', required: true }
    ]
  };

  return (
    <Modal
      open={visible}
      destroyOnClose
      title={<span className="capitalize">Add printer</span>}
      closable={false}
      footer={null}>
      <FormBuilder meta={meta} slim onFinish={handleFinish}>
        <Row>
          <Col span={8}></Col>
          <Col span={16} className="text-right">
            <Space>
              <Button
                disabled={mtBind.isLoading}
                loading={mtBind.isLoading}
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
