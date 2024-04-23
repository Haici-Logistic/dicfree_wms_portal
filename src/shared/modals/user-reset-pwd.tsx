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
import { useMutation } from '@tanstack/react-query';
import { DEFAULT_REST_PASSWORD } from '@/shared/constants';

export default (props) => {
  const { visible, data } = nx.$modal.value('user-reset-pwd');
  const mtSubmit = useMutation(nx.$api.users_reset_pwd);
  const meta = {
    initValues() {
      return { id: data?.id, newPassword: DEFAULT_REST_PASSWORD };
    },
    fields: [
      { key: 'newPassword', label: 'newPassword', required: true },
      { key: 'currUserPassword', label: 'currUserPassword', widget: 'password', required: true }
    ]
  };

  const handleFinish = async (e) => {
    const { id } = data;
    await mtSubmit.mutateAsync({ id, ...e });
    message.success('Reset success!');
    nx.$modal.dismissAll();
  };

  return (
    <Modal
      open={visible}
      footer={null}
      title={<span className="capitalize">user-reset-pwd</span>}
      onCancel={nx.$modal.dismissAll}
      closable>
      <FormBuilder meta={meta} slim onFinish={handleFinish}>
        <Row>
          <Col span={8}></Col>
          <Col span={16} className="text-right">
            <Space>
              <Button disabled={mtSubmit.isLoading} loading={mtSubmit.isLoading} type="primary" htmlType="submit">
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
