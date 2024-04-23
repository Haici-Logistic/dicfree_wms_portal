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
import ReactFullImage from '@jswork/react-full-image';
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { FormBuilder } from '@jswork/antd-form-builder';
import { header, Container } from './_misc';
import Beian from './_beian';

export default () => {
  const { t } = nx.$useIntl();
  const meta = {
    formItemLayout: {},
    fields: [
      {
        key: 'username',
        label: t('login.username'),
        widgetProps: {
          placeholder: 'Please enter username',
          autoComplete: 'off'
        },
        required: true
      },
      {
        key: 'password',
        label: t('login.password'),
        widget: 'password',
        widgetProps: {
          placeholder: 'Please enter password',
          autoComplete: 'off'
        },
        required: true
      }
    ]
  };
  const opts = {
    meta,
    caption: header,
    layout: 'vertical'
  } as any;

  const { mutateAsync, isLoading } = useMutation<KeyIsString>(nx.$api.login);
  const handleFinish = async (e) => {
    const { value } = e.target;
    const res = await mutateAsync(value);
    nx.$set('auth.session', res);
    nx.navigate('/admin');
  };

  const { BUILD_TIME, VERSION } = process.env;

  return (
    <Container className="w-full h-[100vh]">
      <ReactFullImage
        animation="blur"
        src="https://tva1.js.work/large/e6c9d24egy1h5kk7oh4kaj21hw0u0aej.jpg"
      />
      <FormBuilder {...opts} onFinish={handleFinish}>
        <Button
          loading={isLoading}
          disabled={isLoading}
          className="w-full mb-1"
          htmlType="submit"
          size="large"
          type="primary">
          <LoginOutlined />
          {t('login.login')}
        </Button>
        <footer className="flex justify-between text-sm text-gray-300">
          <span>
            Build Time: <code>{BUILD_TIME}</code>
          </span>
          <span>
            Version: <code>{VERSION}</code>
          </span>
        </footer>
      </FormBuilder>

      {/* 备案信息 */}
      <Beian />
    </Container>
  );
};

export const Routes = {
  path: '/login'
};
