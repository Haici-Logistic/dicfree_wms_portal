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
import { Form, Modal, message } from 'antd';
import { FormBuilder } from '@jswork/antd-form-builder';
import { useMutation } from '@tanstack/react-query';
export default (props) => {
  const { visible } = nx.$modal.value('modify-password');
  const [form] = Form.useForm();
  const mtPassReset = useMutation((inEvent) => nx.$api.password_reset(inEvent));

  const handleFinish = async (e) => {
    const res: any = await mtPassReset.mutateAsync(e);
    const hasErr = res?.errorCode;
    if (!hasErr) {
      message.success('Password has been reset!');
      nx.$modal.dismissAll();
    }
  };

  return (
    <Modal
      open={visible}
      title={<span className="capitalize">modify password</span>}
      onCancel={nx.$modal.dismissAll}
      onOk={() => form.submit()}
      destroyOnClose
      okButtonProps={{
        loading: mtPassReset.isLoading
      }}
      closable>
      <Form form={form} onFinish={handleFinish}>
        <FormBuilder
          slim
          form={form}
          meta={{
            fields: [
              { key: 'oldPassword', label: 'Old Password', required: true },
              { key: 'newPassword', label: 'New Password', widget: 'password', required: true },
              {
                key: 'confirmPassword',
                label: 'Confirm Password',
                widget: 'password',
                required: true,
                rules: [
                  {
                    validator: (rule, value, callback) => {
                      return new Promise((resolve, reject) => {
                        if (value !== form.getFieldValue('newPassword')) {
                          reject(new Error('Two passwords are inconsistent.'));
                        } else {
                          resolve(true);
                        }
                      });
                    }
                  }
                ]
              }
            ]
          }}
        />
      </Form>
    </Modal>
  );
};
