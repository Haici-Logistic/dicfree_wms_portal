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
import { Form, Button, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { OUTBOUND_TYPE } from '@/shared/constants';
import { LgSelect, LgInput, LgButton } from '@/shared/components/lg-form-field';
import { useStateProxy } from '@/shared/hooks/use-state-proxy';
import Header from './_header';
import DataList from './_data-list';

export default () => {
  // useForm
  const [form] = Form.useForm();
  // const { session } = nx.$use('auth');
  // const { ts } = nx.$use('app');
  const mainRef = useRef(null);
  const submitRef = useRef(null);
  const state = useStateProxy({ waybill: null, first: '', hasError: false, id: null });
  const mtVerify = useMutation((inValues) => nx.$api.product_delivery_orders_sn_verify(inValues));

  const reset = (force?) => {
    const shouldReset = force || !state.hasError;
    // set name to emtpy + focus
    shouldReset && form.setFieldValue('first', '');
    // focus name input
    mainRef.current.focus();
  };

  const handleFinish = async (e) => {
    const res = await nx.$api.product_delivery_orders_info({ waybill: e.first });
    const id = nx.get(res, 'id');
    if (!id) {
      const res2 = await mtVerify.mutateAsync({ id: state.id, ...e });
      const hasError = !!nx.get(res2, 'errorCode');
      const status = hasError ? 'fail' : 'ok';
      nx.$event.emit('audio', `outbound.${status}`);
      nx.$invalidQuery('product-outbounds-verify.list');
    } else {
      const { id, waybill } = res;
      state.waybill = waybill;
      state.id = id;
    }
    reset();
  };

  return (
    <div className="border rounded">
      <Header id={state.id} label={state.waybill} />

      <section className="rounded-md bg-slate-100 p-5">
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <div className="gap-2">
            <Form.Item name="first">
              <LgInput
                autoFocus
                onBlur={(e) => {
                  state.first = e.target.value;
                }}
                ref={mainRef}
                autoComplete="off"
                size="large"
                type="text"
                placeholder="Enter"
              />
            </Form.Item>
          </div>
          <div className="flex justify-start gap-[20px] mt-8">
            <LgButton
              ref={submitRef}
              disabled={mtVerify.isLoading}
              loading={mtVerify.isLoading}
              size="large"
              type="primary"
              htmlType="submit">
              Verify
            </LgButton>
            <LgButton size="large" onClick={() => reset(true)}>
              Reset
            </LgButton>
          </div>
        </Form>
      </section>

      <DataList id={state.id} />
    </div>
  );
};
